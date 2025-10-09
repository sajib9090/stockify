import { baseApi } from "../api/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: ({ searchTerm }) => `/clients/get-clients?search=${searchTerm}`,
      providesTags: ["Client"],
    }),

    // ✅ LATEST: With parameters
    getClientById: builder.query({
      query: ({ id }) => `/clients/get-client/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Client", id }],
    }),

    // // ✅ LATEST: Object format for POST/PUT/DELETE
    createClient: builder.mutation({
      query: (data) => ({
        url: "/clients/create-client",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
} = clientApi;
