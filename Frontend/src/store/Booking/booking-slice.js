//  managing booking
// store all booking
// store individual booking details
// track the API loading status
// add new booking when a booking is created
// update the booking data when we  recieve it from the backend

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: {},
  loading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingRequest(state) {
      state.loading = true;
    },

    //stores the bookings recieved from the api
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    setBookingDetails(state, action) {
      // state.bookingDetails = action.payload.bookings;
      state.bookingDetails = action.payload;
    },
  },
});

export const { setBookingRequest, setBookings, addBooking, setBookingDetails } =
  bookingSlice.actions;

export default bookingSlice;
