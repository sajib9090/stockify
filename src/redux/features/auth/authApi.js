import { baseApi } from "../api/baseApi.js";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth/register-user",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/auth/logout",
        method: "POST",
      }),
    }),
    editUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: `/users/user/edit-user`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    otpVerify: builder.mutation({
      query: (data) => ({
        url: `/users/user/verify-otp/${data?.email}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    regenerateOTP: builder.mutation({
      query: ({ email }) => ({
        url: `/users/user/regenerate-otp/${email}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: `/users/user/forgot-password/${email}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    setNewPassword: builder.mutation({
      query: (data) => ({
        url: `/users/user/set-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserActivity: builder.query({
      query: () => ({
        url: "/users/user/user-session",
      }),
      providesTags: ["User"],
    }),
    logoutSpecificSession: builder.mutation({
      query: (data) => ({
        url: `/users/user/user-session-logout/${data?.sessionId}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    logoutAllSessions: builder.mutation({
      query: () => ({
        url: `/users/user/user-session-logout-all`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutUserMutation,
  useEditUserProfileMutation,
  useOtpVerifyMutation,
  useRegenerateOTPMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useGetUserActivityQuery,
  useLogoutSpecificSessionMutation,
  useLogoutAllSessionsMutation,
} = authApi;
