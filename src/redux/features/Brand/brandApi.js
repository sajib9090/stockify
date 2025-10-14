import { baseApi } from "../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandInfo: builder.query({
      query: () => "/brands/get-brand-info",
      providesTags: ["Brand"],
    }),
    editBrand: builder.mutation({
      query: ({ data }) => ({
        url: `/brands/edit-brand-info`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const { useGetBrandInfoQuery, useEditBrandMutation } = brandApi;
