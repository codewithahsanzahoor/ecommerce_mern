import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', // fallback for local dev
	withCredentials: true, // (optional) if you're using cookies
});

export default api;
