import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REAC,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;