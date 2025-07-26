import type { Trip } from "../../models";
import { CREATE_TRIP, DELETE_TRIP, GET_TRIP, GET_TRIPS, UPDATE_TRIP } from "..";

export const TripsReducer = (
  state: Trip[] = [],
  action: any,
): Trip[] => {
  switch (action.type) {
    case GET_TRIPS:
      return action.payload;
    case CREATE_TRIP:
      return [...state, action.payload];
    case UPDATE_TRIP:
        return state.map((trip) => trip._id === action.payload._id
                    ? action.payload
                    : trip)
    case DELETE_TRIP:
        return state.filter((trip) => trip._id !== action.payload._id);
    default:
      return state;
  }
};

export const TripReducer = (
    state: Trip | null = null,
    action: any
): Trip | null => {
    switch (action.type) {
        case GET_TRIP:
        case UPDATE_TRIP:
            return action.payload;
        default:
            return state;
    }
};