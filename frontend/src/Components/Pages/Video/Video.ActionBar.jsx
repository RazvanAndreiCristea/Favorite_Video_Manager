import React from "react";
import videoService from "../../../Services/VideoService";

const VideoActionBar = ({selectedVideo, onAddSelected, onEditSelected, onDeleteCallBack}) => {
    const handleAddClick = () => {
        onAddSelected();
    };

    const handleEditClick = () => {
        onEditSelected();
    };

    const handleDeleteClick = () => {
        if (selectedVideo) {
            const confirmDelete = window.confirm("Are you sure you want to delete this video?");
            if (confirmDelete) {
                videoService.deleteVideo(selectedVideo.id)
                    .then(() => {
                        console.log(`Video with ID ${selectedVideo.id} deleted successfully`);
                        onDeleteCallBack();
                    })
                    .catch(error => {
                        console.error(`Error deleting video with ID ${selectedVideo.id}:`, error);
                    });
            }
        }
    };

    return (
        <div class = "UserActionBar , display_buttons">
            <button onClick={handleAddClick}>Add</button>
            <button onClick={handleEditClick} disabled={!selectedVideo}>
                Edit
            </button>
            <button onClick={handleDeleteClick} disabled={!selectedVideo}>Delete</button>
        </div>
    );
}

export default VideoActionBar;
