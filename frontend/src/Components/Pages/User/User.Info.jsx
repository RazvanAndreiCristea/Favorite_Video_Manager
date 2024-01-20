import React from "react";
import UserFavorites from "./User.Favorites";

const UserInfo = ({ selectedUser }) => {
    if (!selectedUser) {
        return null;
    }

    return (
        <div class="SelectedUser">
            {selectedUser && (
                <div>
                    <h3>Selected User</h3>
                    <p>Name: {selectedUser.name}</p>
                    <p>Email: {selectedUser.email}</p>
                    <UserFavorites userId={selectedUser.id} />
                </div>
            )}
        </div>
    );
}

export default UserInfo;
