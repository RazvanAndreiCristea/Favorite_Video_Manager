import React, { useEffect, useState } from "react";
import userService from "../../../Services/UserService";

const UserFavoritesGrid = ({ userId, reload, onSelectFavorite }) => {
    const [favorites, setFavorites] = useState([]);
    const [selectedFavorite, setSelectedFavorite] = useState(null);

    useEffect(() => {
        // Fetch user favorites data from userService using getUserFavorites
        userService.getUserFavorites(userId)
            .then(data => setFavorites(data))
            .catch(error => console.error(`Error fetching user favorites for ID ${userId}:`, error));
    }, [userId, reload]);

    const handleFavoriteClick = (favorite) => {
        setSelectedFavorite(favorite);
        onSelectFavorite(favorite);
    };

    return (
        <div>
            <ul>
                {favorites.map((favorite) => (
                    <li
                        key={favorite.id}
                        onClick={() => handleFavoriteClick(favorite)}
                        className={selectedFavorite && selectedFavorite.id === favorite.id ? 'selected' : ''}
                    >
                        {favorite.title} - <a href={favorite.url} class = "url" target="_blank" rel="noopener noreferrer">{favorite.url}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserFavoritesGrid;