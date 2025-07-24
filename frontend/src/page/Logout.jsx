// components/LogoutButton.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/logout", {}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-gray-100"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
