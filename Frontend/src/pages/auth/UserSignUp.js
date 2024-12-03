import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../services/Api"; // Assume this is the API for signup

const UserSignup = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate("")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await userSignup({
        mobile: formData.mobile,
        password: formData.password,
        userType: "user", // Set userType explicitly for users
      });

      alert("Signup successful!");
      navigate("/");
     
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <FaUserPlus size={50} className="text-purple-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">User Signup</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            Signup
          </button>
          <div className="flex justify-center">
            <p className="pr-2">Already have an account?</p>
            <Link to="/userlogin" className="text-blue-500">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;