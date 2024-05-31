import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./components/features/authentication/api/authApi";
// import { logout } from "./features/authentication/slice/authSlice";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
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