import React, { useEffect, useState } from "react";
import "./UserForm.css";
import userService from "../../../Services/UserService";

const UserForm = ({ selectedUser, setAddEditFalse }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Set form fields if selectedUser is not null (edit mode)
        if (selectedUser) {
            setName(selectedUser.name || "");
            setEmail(selectedUser.email || "");
        }
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: name.trim(),
            email: email.trim(),
        };

        if (!userData.name || !userData.email) {
            alert("Name and Email are required fields");
            return;
        }

        if (selectedUser) {
            userService.updateUser(selectedUser.id, userData)
                .then(() => {
                    console.log(`User with ID ${selectedUser.id} updated successfully`);
                    setAddEditFalse(); // Close the form after update
                })
                .catch(error => {
                    console.error(`Error updating user with ID ${selectedUser.id}:`, error);
                });
        } else {
            // Add new user
            userService.addUser(userData)
                .then(() => {
                    console.log("New user added successfully");
                    setAddEditFalse(); // Close the form after add
                })
                .catch(error => {
                    console.error("Error adding new user:", error);
                });
        }

        // Clear the form fields
        setName("");
        setEmail("");
    };

    return (
        <div className="UserForm">
            <h3>User Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="formField">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="formField">
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="buttons">
                    <div className="submitButton" onClick={handleSubmit}>Submit</div>
                    <div className="cancelButton" onClick={setAddEditFalse}>Cancel</div>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
