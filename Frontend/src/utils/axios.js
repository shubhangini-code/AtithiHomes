//centeralized API setup

//Axios = tool helps connects frontend send  http reqs and receives response from backend

import axios from "axios";
import qs from "qs"; //library that  converts js objects  into url query string.

export const axiosInstance = axios.create({
  // baseURL: "/api",
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
