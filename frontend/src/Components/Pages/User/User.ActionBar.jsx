import React from "react";
import userService from "../../../Services/UserService";

const UserActionBar = ({ selectedUser, onAddSelected, onEditSelected, onDeleteCallBack }) => {
    const handleAddClick = () => {
        onAddSelected();
    };

    const handleEditClick = () => {
        onEditSelected();
    };

    const handleDeleteClick = () => {
        if (selectedUser) {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (confirmDelete) {
                userService.deleteUser(selectedUser.id)
                    .then(() => {
                        console.log(`User with ID ${selectedUser.id} deleted successfully`);
                        onDeleteCallBack();
                    })
                    .catch(error => {
                        console.error(`Error deleting user with ID ${selectedUser.id}:`, error);
                    });
            }
        }
    };

    return (
        <div class="UserActionBar , display_buttons">
            <button onClick={handleAddClick}>Add</button>
            <button onClick={handleEditClick} disabled={!selectedUser}>
                Edit
            </button>
            <button onClick={handleDeleteClick} disabled={!selectedUser}>Delete</button>
        </div>
    );
}

export default UserActionBar;