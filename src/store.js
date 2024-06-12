import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./components/features/authentication/api/authApi";
import { residentApi } from "./components/features/manage-residents/api/residentApi";
import authSliceReducer from "./components/features/authentication/slice/authSlice";
import { requestsApi } from "./components/features/manage-requests/api/requestsApi";

// import { logout } from "./features/authentication/slice/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [residentApi.reducerPath]: residentApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    auth: authSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      residentApi.middleware,
      requestsApi.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);
// const handleLogout = () => {
//   const state = store.getState().auth.token;
//   if (state === null && store.getState().auth.isAuthenticated) {
//     store.dispatch(logout());
//   }
// };
// handleLogout();
// const unsubscribe = store.subscribe(handleLogout);

// unsubscribe();
