// import { axiosInstance } from "../utils/axios";

// export const getTripPlan = async (trip) => {
//   const { data } = await axiosInstance.post("/v1/rent/trip", trip);
//   return data.data;
// };

import { axiosInstance } from "../utils/axios";

export const getTripPlan = async (trip) => {
  try {
    const response = await axiosInstance.post("/v1/rent/trip/plan", trip);

    return response.data;
  } catch (error) {
    console.log("Trip Planner API Error:", error.response?.data);
    console.log("Status:", error.response?.status);
    throw error;
  }
};
