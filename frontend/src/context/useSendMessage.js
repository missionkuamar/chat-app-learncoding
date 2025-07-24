import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) {
      console.error("No selected conversation to send message");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessage((prevMessages) => [...prevMessages, res.data.message || res.data]);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
      throw error;  // Optional: rethrow so caller can handle error
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
