export interface CreateTrip {
    title: string;
    description?: string;
    date: Date;
    steps: Step[];
    photos?: string[];
    distance: number;
    elevationGain: number;
    elevationLoss: number;
    time?: number
    user: string;
};

export interface GetTripsParams {
  page?: number;
  limit?: number;
  search?: string;
};

interface Step {
    step: string;
    waypoints: string[];
}