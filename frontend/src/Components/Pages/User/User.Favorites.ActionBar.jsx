import React from "react";
import userService from "../../../Services/UserService";

const UserFavoritesActionBar = ({ userId, favoriteId, onAddFavorite, onDeleteCallback }) => {
  const handleAddFavorite = () => {
    onAddFavorite();
  };

  const handleDeleteFavorite = () => {
    if (favoriteId) {
      const confirmDelete = window.confirm("Are you sure you want to delete this favorite?");
      if (confirmDelete) {
        userService.deleteUserFavorite(userId, favoriteId)
            .then(() => {
              console.log(`Favorite with ID ${favoriteId} deleted successfully`);
              onDeleteCallback();
            })
            .catch(error => {
              console.error(`Error deleting favorite with ID ${favoriteId}:`, error);
            });
      }
    }
  };

  return (
    <div class="display_buttons">
      <button onClick={handleAddFavorite}>Add Favorite</button>
      <button onClick={handleDeleteFavorite} disabled={!favoriteId}>Delete Favorite</button>
    </div>
  );
};

export default UserFavoritesActionBar;
