import React, { useState } from "react";
import UserFavoritesActionBar from "./User.Favorites.ActionBar";
import UserFavoritesGrid from "./User.Favorites.Grid";
import VideoGrid from "../Video/Video.Grid";
import userService from "../../../Services/UserService";

const UserFavorites = ({ userId }) => {
    const [reload, setReload] = useState(false);
    const [selectedFavorite, setSelectedFavorite] = useState(null);
    const [addingFavorite, setAddingFavorite] = useState(false);
    const [selectedNewFavorite, setSelectedNewFavorite] = useState(null);

    const handleAddFavorite = () => {
        setAddingFavorite(true);
        setSelectedFavorite(null);
        setReload(!reload);
    };

    const handleSelectFavorite = (favorite) => {
        setSelectedFavorite(favorite);
    };

    const handleSelectNewFavorite = (favorite) => {
        setSelectedNewFavorite(favorite);
    }

    const handleCancelNewFavorite = () => {
        setAddingFavorite(false);
    };

    const handleSubmitNewFavorite = () => {
        if (selectedNewFavorite) {
            userService.addUserFavorite(userId, selectedNewFavorite.id)
                .then(() => {
                    console.log("New favorite added successfully");
                    setAddingFavorite(false);
                    setReload(!reload);
                })
                .catch(error => {
                    setAddingFavorite(false);
                    console.error("Error adding new favorite:", error);
                });
        } else {
            console.error("No new favorite selected.");
        }
    };

    return (
        <div>
            <h3>User Favorites</h3>
            {addingFavorite &&
                <>
                    <h3>Select a New Favorite from the List</h3>
                    <VideoGrid onSelect={handleSelectNewFavorite} reload={false} showHeading={false} />
                    <div class="display_buttons ">
                        <button disabled={!selectedNewFavorite} onClick={handleSubmitNewFavorite}>Submit</button>
                        <button onClick={handleCancelNewFavorite}>Cancel</button>
                    </div>
                </>
            }
            {!addingFavorite && <UserFavoritesActionBar userId={userId} favoriteId={selectedFavorite?.id ?? null} onAddFavorite={handleAddFavorite} onDeleteCallback={() => setReload(!reload)} />}
            {!addingFavorite && <UserFavoritesGrid userId={userId} reload={reload} onSelectFavorite={handleSelectFavorite} />}
        </div>
    );
};

export default UserFavorites;