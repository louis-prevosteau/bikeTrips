import { configureStore } from '@reduxjs/toolkit';
import { AuthenticationReducer } from './auth/auth.reducer';
import { TripReducer, TripsReducer } from './trips/trips.reducer';
import { UserReducer } from './users/users.reducer';

export const store = configureStore({
    reducer: {
        auth: AuthenticationReducer,
        trips: TripsReducer,
        trip: TripReducer,
        user: UserReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const AUTH = 'AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const GET_TRIPS = 'GET_TRIPS';
export const GET_TRIP = 'GET_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';
export const UPDATE_TRIP = 'UPDATE_TRIP';
export const DELETE_TRIP = 'DELETE_TRIP';
export const GET_USER = 'GET_USER';