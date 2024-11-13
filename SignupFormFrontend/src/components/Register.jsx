import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*()<>?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const validateForm = () => {
    let newErrors = {};

    if (!register.name) {
      newErrors.name = "Username is required";
    }

    if (!register.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(register.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!register.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(register.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain at least one symbol, one number, one uppercase letter, and one lowercase letter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/addUser", register);
      console.log(response.data);
      alert("User added successfully");
      setRegister({ name: "", email: "", password: "" }); 
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Registration failed"}`);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        console.error("Error in request setup:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const redirectToLogin = () => {
    window.location.href = "/";
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-200 to-amber-50 shadow-md rounded-lg space-y-6 mt-7"
      >
        <h3 className="text-2xl font-bold text-center">Signup Form</h3>
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Username:</label>
          <input
            type="text"
            name="name"
            value={register.name}
            placeholder="Enter your username"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={register.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={register.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full m-4 p-0.5 rounded-full from-indigo-400 via-pink-500 to-purple-500 bg-gradient-to-r"
        >
          <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
            {loading ? "Registering..." : "Register"}
          </span>
        </button>
        
        <a
          className="text-center hover:cursor-pointer text-blue-800 visited:text-pink-400 text-xl"
          onClick={redirectToLogin}
        >
          I have an account
        </a>
      </form>
    </div>
  );
};

export default Register;
