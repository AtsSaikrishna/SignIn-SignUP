import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [password, setPasswordValue] = useState("");
  const [userId, setUserIdValue] = useState("");

  const setPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const setUserId = (e) => {
    setUserIdValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    console.log("Attempting login with", { userId, password });

    const data = {
      userId,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/loginUser", data);

      if (response.data) {
        console.log("Login successful:", response.data);
        alert("Login Successful");
       
      } else {
        console.log("Invalid credentials provided");
        alert("Invalid User Id or Password");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("There was a problem with the login request. Please try again.");
    }
  };

  const redirectToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 overflow-auto">
      <div className="form">
        <form
          className="flex justify-center flex-col w-[45%] mx-auto p-6 bg-gradient-to-r from-green-200 to-amber-50 shadow-md rounded-lg space-y-6 mt-7"
          onSubmit={handleSubmit}
        >
          <label className="block text-gray-700 font-semibold" htmlFor="userId">
            Email:
          </label>
          <input
            id="userId"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
            placeholder="Enter your email"
            value={userId}
            onChange={setUserId}
            required
          />
          <label className="text-gray-700 font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            required
          />
          <a
            className="text-center hover:cursor-pointer text-blue-800 visited:text-pink-400"
            onClick={redirectToRegister}
          >
            I don&apos;t have an account
          </a>
          <button
            type="submit"
            className="m-4 p-0.5 rounded-full from-indigo-400 via-pink-500 to-purple-500 bg-gradient-to-r"
          >
            <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
              Login
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
