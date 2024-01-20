import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/videos'; // Update the URL with your server's address

const videoService = {
    getAllVideos: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
    },

    getVideoById: async (videoId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${videoId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching video with ID ${videoId}:`, error);
            throw error;
        }
    },

    addVideo: async (videoData) => {
        try {
            const response = await axios.post(API_BASE_URL, videoData);
            return response.data;
        } catch (error) {
            console.error('Error adding video:', error);
            throw error;
        }
    },

    updateVideo: async (videoId, videoData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${videoId}`, videoData);
            return response.data;
        } catch (error) {
            console.error(`Error updating video with ID ${videoId}:`, error);
            throw error;
        }
    },

    deleteVideo: async (videoId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${videoId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting video with ID ${videoId}:`, error);
            throw error;
        }
    },
};

export default videoService;
