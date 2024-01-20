import React from "react";

const VideoInfo = ({selectedVideo}) => {
    if (!selectedVideo) {
        return null;
    }   
    
    return (
        <div class="SelectedVideo">
            {/* Display information about the selected video */}
            {selectedVideo && (
                <div >
                    <h3>Selected Video</h3>
                    <p>Title: {selectedVideo.title}</p>
                    <p>URL: <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer">{selectedVideo.url}</a></p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
}

export default VideoInfo;