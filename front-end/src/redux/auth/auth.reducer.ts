import { type Action } from '@reduxjs/toolkit';
import { AUTH, CLEAR_AUTH } from '..';

export const AuthenticationReducer = (
    state: boolean = false,
    action: Action,
): boolean => {
    switch (action.type) {
        case AUTH:
            return true;
        case CLEAR_AUTH:
            return false;
        default:
            return state;
    }
};