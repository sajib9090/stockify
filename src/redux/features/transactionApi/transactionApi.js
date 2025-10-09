import { baseApi } from "../api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/transactions/add-transaction/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client", "Transaction"],
    }),
    getTransactionByClientId: builder.query({
      query: ({ id }) => `/transactions/get-transactions/${id}`,
      providesTags: ["Client", "Transaction"],
    }),

    // // ✅ LATEST: With parameters
    // getClientById: builder.query({
    //   query: ({ id }) => `/clients/get-client/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Client", id }],
    // }),

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

export const { useAddTransactionMutation, useGetTransactionByClientIdQuery } =
  transactionApi;
