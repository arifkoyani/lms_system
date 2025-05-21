import Otp from "../../models/otp/otp.model.js";
import Owner from "../../models/owner/owner.model.js";
import School from "../../models/school/school.model.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import emailHtmlTemplate from "../../utils/emailHTMLTemplat.js";
import generateOTP from "../../utils/generateOtp.js";
import sendEmail from "../../utils/sendEmail.js";
import uploadImage from "../../utils/cloudinary.js";

// const registerOwner =async function(req,res,next){
//     throw new CustomError("this is my cutom error" , 404 , {data:null})
// }

const registerOwner = AsyncHandler(async function (req, res, next) {
  // get fields
  const {
    fullName,
    email,
    phone,
    password,
    plan,
    name,
    city,
    address,
    contactNumber,
    type,
    profile,
  } = req.body;
  // .
  console.log(req.body);
  let secureUrl;
  const { file } = req;
  if (file) {
    const localpath = file.path;
    try {
      const imageUpload = await uploadImage(localpath);
      if (!imageUpload) {
        return next(new CustomError("Image upload failed", 500));
      }

      secureUrl = imageUpload.secure_url;
      console.log(secureUrl, "SECURE URL");
    } catch (error) {
      console.log(error, "EEEEEEEEEEEE");
      return next(new CustomError("Image upload failed", 500));
    }
  }
  // field check
  const fieldsArray = [
    fullName,
    email,
    phone,
    password,
    // profile,
    plan,
    name,
    city,
    address,
    contactNumber,
    type,
  ];

  for (const field of fieldsArray) {
    if (!field) {
      return next(new CustomError("All fields are required", 400));
    }
  }
  console.log(req.body, "this is output");

  //    owner create

  const owner = await Owner.create({
    fullName,
    email,
    phone,
    password,
    plan,
    profile: secureUrl || undefined,
  });

  if (!owner) {
    return next(new CustomError("Owner not created", 400));
  }

  console.log(owner, "OWNER");

  // school create
  const school = await School.create({
    name: name,
    city: city,
    address: address,
    contactNumber: contactNumber,
    type: type,
    owner: owner._id,
  });

  if (!school) {
    return next(new CustomError("School not created", 400));
  }

  // / generate otp
  const ownerOtp = generateOTP();

  //  email send
  try {
    const info = await sendEmail(
      owner.email,
      "OTP verication",
      emailHtmlTemplate(owner.fullName, ownerOtp)
    );
    if (info) {
      const otp = await Otp.create({
        email: owner._id,
        otp: ownerOtp,
        otpExpiry: Date.now() + 10 * 60 * 1000,
        lastOtpSentAt: Date.now(),
      });
      if (!otp) {
        return next(new CustomError("Otp not created", 422));
      }
    }
  } catch (error) {
    return next(new CustomError("Email send failed", 423));
  }

  res.status(201).json({
    message: "OWNER AND SCHOOL CREATED SUCCESFFULY ",
    status: 1,
    data: {
      owner,
      school,
    },
  });
});

const imageUpload = AsyncHandler(async (req, res, next) => {
  const { file } = req;
  console.log(file, "FILE");
  if (!file) {
    return next(new CustomError("Image not found", 404));
  }

  const imageObj = await uploadImage(file.path);
  if (!imageObj) {
    return next(new CustomError("Image upload failed", 500));
  }
  res.json({
    message: "Image uploaded successfully",
    status: 1,
  });
});

// login user
const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password
  if (!email || !password) {
    return next(new CustomError("EMAIL AND PASSWORD REQUIRED", 404));
  }
  // check email
  const isEmailExist = await Owner.findOne({ email });
  if (!isEmailExist) {
    return next(new CustomError("Email not found", 404));
  }
  // check password
  const isPasswordMathed = await isEmailExist.comparePassword(password);

  if (!isPasswordMathed) {
    return next(new CustomError("Email or password is incorrect ", 404));
  }

  // check user is verify or not
  if (!isEmailExist.isVerify) {
    return next(
      new CustomError("Please verify your account first before login", 401)
    );
  }

  // login user
  res.json({
    status: 1,
    message: "Login successfully",
    data: {
      user: isEmailExist,
    },
  });
});

export { registerOwner, imageUpload, login };
