import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/allusers", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Available Users</h2>
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:bg-indigo-50 transition flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{user.fullname}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Link
                to={`/chat/${user._id}`}
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                Chat
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
