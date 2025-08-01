import type { User } from "./user";

export interface CreateTrip {
  title: string;
  profile: string;
  description?: string;
  date: Date;
  steps: Step[];
  photos?: string[];
  distance: number;
  elevationGain: number;
  elevationLoss: number;
  time?: number;
  user: string;
}

export interface Trip {
  _id: string;
  title: string;
  profile: string;
  description?: string;
  date: Date;
  steps: Step[];
  photos?: string[];
  distance: number;
  elevationGain: number;
  elevationLoss: number;
  time?: number;
  user: User;
}

export interface GetTripsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface Step {
  step: string;
  waypoints: string[];
}
