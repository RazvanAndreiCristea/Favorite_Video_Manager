import React, { useState } from "react";

import "./User.css";
import UserActionBar from "./User.ActionBar";
import UserGrid from "./User.Grid";
import UserForm from "./User.Form";
import UserInfo from "./User.Info";

const UserPage = () => {
    const [addEdit, setAddEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reload, setReload] = useState(false);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleAddSelect = () => {
        setSelectedUser(null);
        setAddEdit(true);
        setReload(true);
    };

    const handleEditSelected = () => {
        setAddEdit(true);
        setReload(true);
    }

    const handleAddEditSubmitted = () => {
        setSelectedUser(null);
        setAddEdit(false);
    }

    return (
        <div class = "boxing">
            <h1>User Page</h1>
            {addEdit && <UserForm selectedUser={selectedUser} setAddEditFalse={handleAddEditSubmitted} />}
            {!addEdit && <UserActionBar selectedUser={selectedUser} onAddSelected={handleAddSelect} onEditSelected={handleEditSelected} onDeleteCallBack={() => setReload(!reload)} />}
            {!addEdit && <UserGrid onSelect={handleUserSelect} reload={reload} />}
            {!addEdit && <UserInfo selectedUser={selectedUser} />}
        </div>
    );
};

export default UserPage;
