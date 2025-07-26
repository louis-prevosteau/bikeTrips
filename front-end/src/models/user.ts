import type { Trip } from "./trip";

export interface UpdateUser {
    avatar?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface User {
    avatar?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    followers: User[];
    followings: User[];
    favoriteTrips: Trip[];
}