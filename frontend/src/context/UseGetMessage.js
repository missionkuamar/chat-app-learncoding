import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation || !selectedConversation._id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
        // Assuming your API returns messages in res.data.messages
        setMessage(res.data.messages || []);
      } catch (error) {
        setError(error);
        console.error("Error in getting messages", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages, error };
};

export default useGetMessage;
