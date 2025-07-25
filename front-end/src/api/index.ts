import axios from 'axios';
import type { CreateTrip, GetTripsParams, Login, Register, UpdateUser } from '../models';
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((req) => {
    if (localStorage.getItem('token'))
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return req;
});

export const register = (data: Register) => api.post('auth/register', data);
export const login = (data: Login) => api.post('auth/login', data);
export const getTrips = (params: GetTripsParams) => {
  return api.get('/trips', { params });
};
export const getTrip = (id: string) => api.get(`trips/${id}`);
export const createTrip = (data: CreateTrip) => api.post('trips', data);
export const updateTrip = (id: string, data: CreateTrip) => api.patch(`trips/${id}`, data);
export const deleteTrip = (id: string) => api.delete(`trips/${id}`);
export const likeTrip = (id: string) => api.patch(`trips/${id}/like`);
export const unlikeTrip = (id: string) => api.patch(`trips/${id}/unlike`);
export const getUser = (id: string) => api.get(`users/${id}`);
export const getProfile = () => api.get('users/profile');
export const updateProfile = (data: UpdateUser) => api.patch('users/profile', data);
export const deleteProfile = () => api.delete('users/profile');
export const followUser = (id: string) => api.patch(`users/${id}/follow`);
export const unfollowUser = (id: string) => api.patch(`users/${id}/unfollow`);

export const getORSRoute = (profile: string, waypoints: string[][]) => {
  return axios.post(
    `https://api.openrouteservice.org/v2/directions/cycling-${profile}/geojson`,
    {
      coordinates: waypoints.map(([lat, lng]) => [parseFloat(lng), parseFloat(lat)]),
      elevation: true,
    },
    {
      headers: {
        'Authorization': process.env.REACT_APP_ORS_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
};