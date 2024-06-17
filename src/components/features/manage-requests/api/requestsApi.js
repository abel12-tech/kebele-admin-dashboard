import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../constants";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";

export const requestsApi = createApi({
  reducerPath: "requestsApi",
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
    getAllRequests: builder.query({
      query: () => "/id/",
      method: "GET",
    }),
    getAllRequestInKebele: builder.query({
      query: () => "/id/in-my-kebele/",
      method: "GET",
    }),

    getRequestById: builder.query({
      query: (id) => `/id/${id}`,
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/id/${id}`,
        method: "DELETE",
      }),
    }),
    updateStatus: builder.mutation({
      query: (data) => ({
        url: `/id/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useDeleteRequestMutation,
  useGetAllRequestInKebeleQuery,
  useUpdateStatusMutation,
  useGetRequestByIdQuery,
} = requestsApi;
