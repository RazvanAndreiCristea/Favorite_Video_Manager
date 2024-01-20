import React, { useState, useEffect } from "react";
import "./UserGrid.css";
import userService from "../../../Services/UserService";

const UserGrid = ({ onSelect, reload }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Fetch user data from userService using getAllUsers
        userService.getAllUsers()
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, [reload]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        onSelect(user);
    };

    return (
        <div class="UserGrid boxing-grid">
            <h3>List of Users</h3>
            <ul>
                {users.map((user) => (
                    <li
                        className={`UserGridItem ${selectedUser && selectedUser.id === user.id ? 'selected' : ''}`}
                        key={user.id}
                        onClick={() => handleUserClick(user)}
                    >
                        <span className="UserName">{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserGrid;
