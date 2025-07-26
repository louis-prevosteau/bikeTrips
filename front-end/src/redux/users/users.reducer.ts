import { GET_USER } from "..";
import type { User } from "../../models";

export const UserReducer = (
    state: User | null = null,
    action: any
) => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        default:
            return state;
    }
};