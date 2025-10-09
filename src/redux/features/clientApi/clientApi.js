import { baseApi } from "../api/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/clients/get-clients",
      providesTags: ["Client"],
    }),

    // ✅ LATEST: With parameters
    getClientById: builder.query({
      query: ({ id }) => `/clients/get-client/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Client", id }],
    }),

    // // ✅ LATEST: Object format for POST/PUT/DELETE
    // createBrand: builder.mutation({
    //   query: (data) => ({
    //     url: "/brands",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Brand"],
    // }),

    // // ✅ LATEST: With query params
    // searchBrands: builder.query({
    //   query: ({ name, page = 1 }) => ({
    //     url: "/brands/search",
    //     params: { name, page }, // Modern way to add query params
    //   }),
    //   providesTags: ["Brand"],
    // }),

    // // ✅ LATEST: With custom headers
    // getProtectedBrand: builder.query({
    //   query: (id) => ({
    //     url: `/brands/${id}/protected`,
    //     headers: {
    //       "X-Custom-Header": "value",
    //     },
    //   }),
    //   providesTags: (result, error, id) => [{ type: "Brand", id }],
    // }),
  }),
});

export const { useGetClientsQuery, useGetClientByIdQuery } = clientApi;
