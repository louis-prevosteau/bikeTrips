import * as api from "../../api";
import { handleError } from "../../utils/toasts";
import { GET_USER, type AppDispatch } from "..";
import type { UpdateUser } from "../../models";

export const getUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const getProfile = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.getProfile();
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateProfile = (userData: UpdateUser) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.updateProfile(userData);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const followUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.followUser(id);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};
export const unfollowUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.unfollowUser(id);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    handleError(error);
  }
};
