import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4040/api/v1/owner/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Login successful nicasdasdasdasd ae");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto mt-10 p-4 bg-white  rounded-xl shadow-md space-y-6asdasd"
    >
      <input
        type="email"
        placeholder="Email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 text-blue-500 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* "thisi si clear" */}
      <input
        type="password"
        placeholder="Password here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 text-black py-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
    </form>
  );
}
