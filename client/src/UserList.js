import React from "react";

const UserList = ({ users, selectUser }) => (
  <div className="user-list">
    {users.map((user) => (
      <div
        key={user.id}
        onClick={() => selectUser(user)}
        className="cursor-pointer p-2 border-b"
      >
        {user.name}
        {user.status ? <img /> : <img />}
      </div>
    ))}
  </div>
);

export default UserList;
