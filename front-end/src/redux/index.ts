import { configureStore } from '@reduxjs/toolkit';
import { AuthenticationReducer } from './auth/auth.reducer';
import { TripReducer, TripsReducer } from './trips/trips.reducer';
import { ProfileReducer, UserReducer } from './users/users.reducer';
export const AUTH = 'AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const GET_TRIPS = 'GET_TRIPS';
export const GET_TRIP = 'GET_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';
export const UPDATE_TRIP = 'UPDATE_TRIP';
export const DELETE_TRIP = 'DELETE_TRIP';
export const GET_USER = 'GET_USER';
export const GET_PROFILE = 'GET_PROFILE';

export const store = configureStore({
    reducer: {
        isAuth: AuthenticationReducer,
        trips: TripsReducer,
        trip: TripReducer,
        user: UserReducer,
        profile: ProfileReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
