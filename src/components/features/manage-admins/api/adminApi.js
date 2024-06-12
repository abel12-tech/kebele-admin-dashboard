import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../constants";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getTokenFromCookies();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/admin/",
      method: "GET",
    }),
    getKebeles: builder.query({
      query: () => "/kebele/",
      method: "GET",
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/",
        method: "POST",
        body: data,
      }),
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetKebelesQuery,
} = adminApi;
