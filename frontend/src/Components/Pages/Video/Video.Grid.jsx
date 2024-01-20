import React, { useState, useEffect } from "react";
import "./VideoGrid.css";
import videoService from "../../../Services/VideoService";

const VideoGrid = ({ onSelect, reload, showHeading }) => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        // Fetch video data from videoService using getAllVideos
        videoService.getAllVideos()
            .then(data => setVideos(data))
            .catch(error => console.error("Error fetching video data:", error));
    }, [reload]);


    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        onSelect(video);
    };

    return (
        <div class="VideoGrid">
            {showHeading && <h3>List of Videos</h3>}
            <ul>
                {videos.map((video) => (
                    <li
                        className={`VideoGridItem ${selectedVideo && selectedVideo.id === video.id ? 'selected' : ''}`}
                        key={video.id}
                        onClick={() => handleVideoClick(video)}
                    >
                        {video.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoGrid;

