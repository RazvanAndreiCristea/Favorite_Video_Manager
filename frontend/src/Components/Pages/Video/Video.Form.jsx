import React, { useEffect, useState } from "react";
import "./VideoForm.css";
import videoService from "../../../Services/VideoService";

const VideoForm = ({ selectedVideo, setAddEditFalse }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        // Set form fields if selectedVideo is not null (edit mode)
        if (selectedVideo) {
            setTitle(selectedVideo.title || "");
            setUrl(selectedVideo.url || "");
        }
    }, [selectedVideo]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const videoData = {
            url: url.trim(),
            title: title.trim(),
        };

        if (!videoData.title || !videoData.url) {
            alert("Title and URL are required fields");
            return;
        }

        if (selectedVideo) {
            videoService.updateVideo(selectedVideo.id, videoData)
                .then(() => {
                    console.log(`Video with ID ${selectedVideo.id} updated successfully`);
                    setAddEditFalse(); // Close the form after update
                })
                .catch(error => {
                    console.error(`Error updating video with ID ${selectedVideo.id}:`, error);
                });
        } else {
            // Add new video
            videoService.addVideo(videoData)
                .then(() => {
                    console.log("New video added successfully");
                    setAddEditFalse(); // Close the form after add
                })
                .catch(error => {
                    console.error("Error adding new video:", error);
                });
        }

        // Clear the form fields
        setTitle("");
        setUrl("");
    };

    return (
        <div className="VideoForm">
            <h3>Video Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="formField">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="formField">
                    <label>URL:</label>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="buttons">
                    <div className="submitButton" onClick={handleSubmit}>
                        Submit
                    </div>
                    <div className="cancelButton" onClick={setAddEditFalse}>
                        Cancel
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VideoForm;