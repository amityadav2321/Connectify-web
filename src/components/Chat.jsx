import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const [searchParams] = useSearchParams();

  const theirName = searchParams.get("name") || "Unknown";
  const theirPhotoUrl = searchParams.get("photo") || "/default-avatar.png";

  const myUser = useSelector((state) => state.user);
  const myPhotoUrl = myUser?.photoUrl || "/default-avatar.png";
  const userId = myUser?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);
  const messageContainerRef = useRef(null);

  //  Scroll chat to bottom on new message
  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = res?.data?.messages.map((msg) => ({
        text: msg.text,
        sender: msg.senderId?._id === userId ? "me" : "them",
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchChatMessages();
  }, [userId, targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: myUser.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ text, senderId }) => {
      const isMe = senderId === userId;
      setMessages((prev) => [...prev, { text, sender: isMe ? "me" : "them" }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("sendMessage", {
      firstName: myUser.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
  <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden flex justify-center pt-10 px-4">
    
    <div className="absolute left-10 bottom-0 w-[200px] h-[600px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rotate-12 blur-2xl pointer-events-none"></div>
    <div className="absolute right-10 top-0 w-[200px] h-[600px] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent -rotate-12 blur-2xl pointer-events-none"></div>

    
    <div className="relative z-10 w-full max-w-3xl h-[80vh] border border-gray-700 rounded-lg flex flex-col bg-gray-900/80 backdrop-blur-md shadow-xl">
      
      <div className="p-4 border-b border-gray-700 text-lg font-semibold bg-gray-800/80 rounded-t-lg">
        Chat with {theirName}
      </div>

      
      <div
        ref={messageContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4"
      >
        {messages.map((msg, index) => {
          const isMe = msg.sender === "me";
          return (
            <div
              key={index}
              className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={theirPhotoUrl}
                  alt="user"
                  className="w-8 h-8 rounded-full mr-2 border border-gray-600 object-cover"
                />
              )}
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  isMe ? "bg-cyan-700 text-right" : "bg-gray-700 text-left"
                }`}
              >
                {msg.text}
              </div>
              {isMe && (
                <img
                  src={myPhotoUrl}
                  alt="me"
                  className="w-8 h-8 rounded-full ml-2 border border-gray-600 object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

     
      <div className="flex border-t border-gray-700 p-3 bg-gray-800/80 rounded-b-lg">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className={`px-5 py-2 rounded-r-md font-semibold transition ${
            newMessage.trim()
              ? "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              : "bg-gray-600 cursor-not-allowed text-gray-300"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

};

export default Chat;
