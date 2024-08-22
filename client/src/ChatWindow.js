import React, { useState, useEffect } from "react";

const ChatWindow = ({ user, messages, sendMessage }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(user.id, text);
    setText("");
  };

  if (!user || !user.id) {
    return <div>Please select a user to chat with.</div>;
  }

  return (
    <div className="chat-window flex flex-col p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Chat with {user.name}</h2>
      <div className="messages flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 max-w-xs ${
              msg.senderId === localStorage.getItem("id")
                ? "ml-auto bg-blue-500 text-white rounded-lg text-right"
                : "mr-auto bg-gray-200 text-black rounded-lg text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded-l-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default ChatWindow;
