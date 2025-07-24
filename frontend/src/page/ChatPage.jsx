import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ChatPage = () => {
  const { id: receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/message/${receiverId}`,
        { withCredentials: true }
      );
      setMessages(res.data.messages || []);
    } catch (err) {
      toast.error("Failed to load messages");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/message/send/${receiverId}`,
        { message: messageInput },
        { withCredentials: true }
      );
      setMessages([...messages, res.data.message]);
      setMessageInput("");
    } catch (err) {
      toast.error("Message failed to send");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="bg-gray-100 p-4 rounded h-[400px] overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 p-2 rounded max-w-xs ${
              msg.senderId === receiverId
                ? "bg-white text-left"
                : "bg-indigo-100 text-right ml-auto"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
