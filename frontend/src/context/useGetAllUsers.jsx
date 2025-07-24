import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          withCredentials: true,  // Correct option for axios
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
      } catch (error) {
        setError(error);
        console.log("Error in useGetAllUsers: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { allUsers, loading, error };
}

export default useGetAllUsers;
