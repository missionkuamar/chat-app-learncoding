import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // lowercase 'message'
    const { id: receiverId } = req.params; // receiver id from URL param
    const senderId = req.user._id; // logged in user id

    // Sender apne aap ko message nahi bhej sakta
    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send message to yourself",
      });
    }

    // Find conversation between sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        messages: [],
      });
    }

    // Create a new message document
    const newMessage = new Message({
      conversationId: conversation._id, // conversation id from the Conversation found/created above
      senderId, // logged in user id
      receivedId: receiverId, // from URL params
      message, // text from req.body.message
    });

    // Save the new message
    await newMessage.save();

    // Push the new message's id to the conversation's messages array
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Get receiver's socket id and emit event to them
    const receiverSocketId = await getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Send success response
    return res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log("Error in send Message Route:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in send Message Route",
      data: [],
    });
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user?._id;

    // Find conversation between logged in user and chatUser
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages"); // populate messages array

    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
        message: "No conversation found between these users",
      });
    }

    // Return messages
    return res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  } catch (error) {
    console.log("Error in get Message Route:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in get Message Route",
      data: [],
    });
  }
};
