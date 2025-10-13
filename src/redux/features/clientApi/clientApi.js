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

    deleteClientById: builder.mutation({
      query: ({ id }) => ({
        url: `/clients/delete-client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
    editClientById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clients/edit-client/${id}`,
        method: "PUT",
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
  useDeleteClientByIdMutation,
  useEditClientByIdMutation,
} = clientApi;
