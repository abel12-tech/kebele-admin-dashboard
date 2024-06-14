import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";
import { BASE_URL } from "../../../../constants";

export const residentApi = createApi({
  reducerPath: "residentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = getTokenFromCookies();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllResidents: builder.query({
      query: () => "/resident/",
      method: "GET",
    }),
    getResidentInKebele: builder.query({
      query: () => "/resident/in-my-kebele",
      method: "GET",
    }),
    deleteResident: builder.mutation({
      query: (id) => ({
        url: `/resident/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllResidentsQuery,
  useDeleteResidentMutation,
  useGetResidentInKebeleQuery,
} = residentApi;
