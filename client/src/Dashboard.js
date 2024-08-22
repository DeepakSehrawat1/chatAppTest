import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";

const socket = io("http://localhost:4000");

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const handleNewMessage = (message) => {
        if (
          message.senderId === selectedUser.id ||
          message.receiverId === selectedUser.id
        ) {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedUser.id]: [
              ...(prevMessages[selectedUser.id] || []),
              message,
            ],
          }));
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => socket.off("newMessage", handleNewMessage);
    }
  }, [selectedUser]);

  const selectUser = async (user) => {
    setSelectedUser(user);
    const send = localStorage.getItem("id");
    try {
      const response = await axios.get(
        `http://localhost:4000/messages/${send}/${user.id}`
      );

      setMessages((prevMessages) => ({
        ...prevMessages,
        [user.id]: response.data,
      }));
    } catch (err) {
      throw err;
    }
  };

  const sendMessage = async (receiverId, text) => {
    try {
      await axios.post("http://localhost:4000/messages", {
        senderId: localStorage.getItem("id"),
        receiverId,
        text,
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="h-screen grid grid-cols-3">
      <div className="bg-gray-100 p-4 border-r">
        <UserList users={users} selectUser={selectUser} />
      </div>

      <div className="bg-green-200 p-4 col-span-2">
        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={messages[selectedUser.id] || []}
            sendMessage={sendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              Please select a user to start chatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
