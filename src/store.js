import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./components/features/authentication/api/authApi";
import { residentApi } from "./components/features/manage-residents/api/residentApi";
import authSliceReducer from "./components/features/authentication/slice/authSlice";
import { requestsApi } from "./components/features/manage-requests/api/requestsApi";
import { adminApi } from "./components/features/manage-admins/api/adminApi";
import { dataApi } from "./components/features/dashboard-summary/api/dataApi";
import { kebeleApi } from "./components/features/manage-kebele/api/kebeleApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [residentApi.reducerPath]: residentApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [kebeleApi.reducerPath]: kebeleApi.reducer,
    auth: authSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      residentApi.middleware,
      requestsApi.middleware,
      adminApi.middleware,
      dataApi.middleware,
      kebeleApi.middleware
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
