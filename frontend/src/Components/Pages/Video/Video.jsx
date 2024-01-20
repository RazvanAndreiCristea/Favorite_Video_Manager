import React, { useState } from "react";

import "./Video.css";
import VideoCRUDBar from "./Video.ActionBar";
import VideoGrid from "./Video.Grid";
import VideoForm from "./Video.Form";
import VideoInfo from "./Video.Info";

const VideoPage = () => {
    const [addEdit, setAddEdit] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [reload, setReload] = useState(false);
    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleAddSelect = () => {
        setSelectedVideo(null);
        setAddEdit(true);
        setReload(true);
    };

    const handleEditSelected = () => {
        setAddEdit(true);
        setReload(true);
    }

    return (
        <div class = "boxing">
            <h1>VideoPage</h1>
            {addEdit && <VideoForm selectedVideo={selectedVideo} setAddEditFalse={() => setAddEdit(false)}/>}
            {!addEdit && <VideoCRUDBar selectedVideo={selectedVideo} onAddSelected={handleAddSelect} onEditSelected={handleEditSelected} onDeleteCallBack={() => setReload(!reload)}/>}
            {!addEdit && <VideoGrid onSelect={handleVideoSelect} reload={reload} showHeading={true}/>}
            {!addEdit && <VideoInfo selectedVideo={selectedVideo}/>}
        </div>
    );
};

export default VideoPage;
