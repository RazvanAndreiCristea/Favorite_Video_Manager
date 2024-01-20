import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/users'; // Update the URL with your server's address

const userService = {
    getAllUsers: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getUserById: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            throw error;
        }
    },

    addUser: async (userData) => {
        try {
            const response = await axios.post(API_BASE_URL, userData);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error(`Error updating user with ID ${userId}:`, error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            throw error;
        }
    },

    getUserFavorites: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}/favorites`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user favorites for ID ${userId}:`, error);
            throw error;
        }
    },

    addUserFavorite: async (userId, videoId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${userId}/favorites`, { video_id: videoId });
            return response.data;
        } catch (error) {
            console.error(`Error adding favorite for user ID ${userId} and video ID ${videoId}:`, error);
            throw error;
        }
    },

    deleteUserFavorite: async (userId, videoId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${userId}/favorites/${videoId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting favorite for user ID ${userId} and video ID ${videoId}:`, error);
            throw error;
        }
    },
};

export default userService;
