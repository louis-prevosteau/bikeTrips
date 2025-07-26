import * as api from "../../api";
import type { Login, Register } from "../../models";
import { AUTH, CLEAR_AUTH, type AppDispatch } from "..";
import i18next from "i18next";
import { handleError, handleSuccess } from "../../utils/toasts";

export const register =
  (registerData: Register) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.register(registerData);
      dispatch({
        type: AUTH,
      });
      localStorage.setItem("token", data.token);
      handleSuccess(i18next.t("toasts.authentication"));
    } catch (error) {
      handleError(error);
    }
  };

export const login = (loginData: Login) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.login(loginData);
    dispatch({
      type: AUTH,
    });
    localStorage.setItem("token", data.token);
    handleSuccess(i18next.t("toasts.authentication"));
  } catch (error) {
    handleError(error);
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: CLEAR_AUTH,
    });
    localStorage.removeItem("token");
    handleSuccess(i18next.t("toasts.logout"));
  } catch (error) {
    handleError(error);
  }
};
