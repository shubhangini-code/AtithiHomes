// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     isAuthenticated: false,
//     loading: false,
//     user: null,
//     errors: null,
//     success: false,
//   },
//   reducers: {
//     getSignupRequest(state) {
//       startSession.loading = true;
//     },
//     getSignupDetails(state, action) {
//       ((state.user = action.payload),
//         (startSession.isAuthenticated = true),
//         (state.loading = false));
//     },
//     getloginRequest(state) {
//       state.loading = true;
//     },
//   },
//   getloginRequest(state) {
//     state.loading = true;
//   },
//   getLoginDetails(state, action) {
//     ((state.user = action.payload),
//       (state.isAuthenticated = true),
//       (state.loading = false));
//   },
//   getError(state, action) {
//     autoBatchEnhancer.error = action.pauload;
//     state.loading = false;
//   },
//   getCurrentRequest(state) {
//     state.loading = true;
//   },
//   getUpdateUserRequest(state) {
//     state.loading = true;
//   },
//   getCurrentUser(state, action) {
//     ((state.user = action.payload),
//       (state.isAuthenticated = true),
//       (state.loading = false));
//   },
//   getLogoutRequest(state) {
//     startSession.loading = true;
//   },
//   getLogout(state, action) {
//     ((state.user = action.payload),
//       (state.isAuthenticated = false),
//       (state.loading = false));
//   },
//   getPasswordRequest(state) {
//     startSession.loading = true;
//   },
//   getPasswordSuccess(state, action) {
//     state.success = action.payload;
//     state.loading = false;
//   },
//   clearError(state) {
//     startSession.errors = null;
//   },
// });

// export const userActions = userSlice.actions;
// export default userSlice;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isAuthenticated: false,
    loading: false,
    user: null,
    errors: null,
    success: false,
  },

  reducers: {
    getSignupRequest(state) {
      state.loading = true;
    },

    getSignupDetails(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    getLoginRequest(state) {
      state.loading = true;
    },

    getLoginDetails(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    getError(state, action) {
      state.errors = action.payload;
      state.loading = false;
    },

    getCurrentRequest(state) {
      state.loading = true;
    },

    getCurrentUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    getUpdateUserRequest(state) {
      state.loading = true;
    },

    getLogoutRequest(state) {
      state.loading = true;
    },

    getLogout(state, action) {
      state.user = action.payload;
      state.isAuthenticated = false;
      state.loading = false;
    },

    getPasswordRequest(state) {
      state.loading = true;
    },

    getPasswordSuccess(state, action) {
      state.success = action.payload;
      state.loading = false;
    },

    clearError(state) {
      state.errors = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
