import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../constants";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";

export const kebeleApi = createApi({
  reducerPath: "kebeleApi",
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
    getAllKebeles: builder.query({
      query: () => "/kebele/",
      method: "GET",
    }),

    deleteKebele: builder.mutation({
      query: (id) => ({
        url: `/id/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllKebelesQuery, useDeleteKebeleMutation } = kebeleApi;
