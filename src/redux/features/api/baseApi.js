// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout, setUser } from "../auth/authSlice";

// const baseUrl = "http://localhost:5432/api/v1";

// const baseQuery = fetchBaseQuery({
//   baseUrl: baseUrl,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 423) {
//     api.dispatch(logout());
//   }
//   if (result?.error?.status === 401) {
//     const res = await fetch(`${baseUrl}/users/auth/manage-token`, {
//       method: "GET",
//       credentials: "include",
//     });

//     const data = await res?.json();
//     if (data?.accessToken) {
//       //getting user
//       const user = api.getState().auth.user;
//       api.dispatch(
//         setUser({
//           user,
//           token: data?.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   tagTypes: ["User", "Brand"],
//   endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../auth/authSlice";
import { toast } from "sonner";

const baseUrl = "http://localhost:5432/api/v1";

// Cache the refresh promise to prevent multiple simultaneous refresh requests
let refreshPromise = null;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle account locked/suspended
  if (result?.error?.status === 423) {
    try {
      await fetch(`${baseUrl}/users/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      // Silently fail - logout from frontend anyway
      toast.error(error);
    } finally {
      api.dispatch(logout());
    }
    return result;
  }

  // Handle unauthorized - token expired
  if (result?.error?.status === 401) {
    // If a refresh is already in progress, wait for it
    if (refreshPromise) {
      await refreshPromise;
      // Retry original request with new token
      return baseQuery(args, api, extraOptions);
    }

    // Start new refresh process
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${baseUrl}/users/auth/manage-token`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Token refresh failed");
        }

        const data = await res.json();

        if (data?.accessToken) {
          const user = api.getState().auth.user;
          api.dispatch(
            setUser({
              user,
              token: data?.accessToken,
            })
          );
          return true;
        }

        throw new Error("No access token received");
      } catch (error) {
        // Call backend logout before dispatching frontend logout
        try {
          await fetch(`${baseUrl}/users/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (logoutError) {
          toast.error(logoutError);
        } finally {
          api.dispatch(logout());
        }
        return false;
      } finally {
        refreshPromise = null;
      }
    })();

    const refreshSuccess = await refreshPromise;

    // Retry original request if refresh succeeded
    if (refreshSuccess) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["User", "Brand", "Client", "Transaction"],
  endpoints: () => ({}),
  // Add performance optimizations
  keepUnusedDataFor: 60, // Cache unused data for 60 seconds (default is 60)
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false, // Disable automatic refetch on window focus
  refetchOnReconnect: true, // Refetch when network reconnects
});
