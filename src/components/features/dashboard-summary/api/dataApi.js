import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../constants";
import { getTokenFromCookies } from "../../../../shared/getToken.mjs";

export const dataApi = createApi({
  reducerPath: "dataApi",
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
    getKebeleDatas: builder.query({
      query: () => "/dashboard/kebele/",
      method: "GET",
    }),
    getDataInKebele: builder.query({
      query: () => "/dashboard/summary-in-Kebele",
      method: "GET",
    }),
  }),
});

export const { useGetKebeleDatasQuery, useGetDataInKebeleQuery } = dataApi;
