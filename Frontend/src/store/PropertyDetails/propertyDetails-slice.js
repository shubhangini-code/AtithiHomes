// //property details

// //create a slice

// //create initial state
// // reqquest startSession
// // property data recieved
// // error occurs
// // export Actions
// // export slice

// import { createSlice } from "@reduxjs/toolkit";
// import { getProperty } from "../../../../backend/src/controllers/propertyController";

// const propertDetailsSlice = createSlice({
//   name: "propertyDetails",
//   initialState: {
//     propertydetails: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     getListRequest(state) {
//       state.loading = true;
//     },
//     getPropertyDetails(state, action) {
//       state.propertydetails = action.payload;
//       state.loading = false;
//     },
//     getErrors(state, action) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });
// export const propertDetailsAction = propertDetailsSlice.actions;
// export default propertDetailsSlice;

import { createSlice } from "@reduxjs/toolkit";

const propertDetailsSlice = createSlice({
  name: "propertyDetails",

  initialState: {
    propertydetails: null,
    loading: false,
    error: null,
  },

  reducers: {
    getListRequest(state) {
      state.loading = true;
    },

    getPropertyDetails(state, action) {
      state.propertydetails = action.payload;
      state.loading = false;
    },

    getErrors(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const propertDetailsAction = propertDetailsSlice.actions;

export default propertDetailsSlice;
