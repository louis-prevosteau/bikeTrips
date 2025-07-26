import * as api from "../../api";
import i18next from "i18next";
import { handleError, handleSuccess } from "../../utils/toasts";
import type { CreateTrip, GetTripsParams } from "../../models";
import { CREATE_TRIP, DELETE_TRIP, GET_TRIP, GET_TRIPS, UPDATE_TRIP, type AppDispatch } from "..";

export const getTrips =
  (params: GetTripsParams) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.getTrips(params);
      dispatch({
        type: GET_TRIPS,
        payload: data,
      });
    } catch (error) {
      handleError(error);
    }
  };

export const getTrip = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.getTrip(id);
    dispatch({
      type: GET_TRIP,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const createTrip =
  (trip: CreateTrip) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.createTrip(trip);
      dispatch({
        type: CREATE_TRIP,
        payload: data,
      });
      handleSuccess(i18next.t("toasts.create"));
    } catch (error) {
      handleError(error);
    }
  };

  export const updateTrip =
  (id: string, trip: CreateTrip) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.updateTrip(id, trip);
      dispatch({
        type: UPDATE_TRIP,
        payload: data,
      });
      handleSuccess(i18next.t("toasts.update"));
    } catch (error) {
      handleError(error);
    }
  };

  export const likeTrip =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.likeTrip(id);
      dispatch({
        type: UPDATE_TRIP,
        payload: data,
      });
    } catch (error) {
      handleError(error);
    }
  };

  export const unlikeTrip =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.unlikeTrip(id);
      dispatch({
        type: UPDATE_TRIP,
        payload: data,
      });
    } catch (error) {
      handleError(error);
    }
  };

  export const deleteTrip =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.deleteTrip(id);
      dispatch({
        type: DELETE_TRIP,
        payload: data,
      });
      handleSuccess(i18next.t('toasts.delete'));
    } catch (error) {
      handleError(error);
    }
  };
