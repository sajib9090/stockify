import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AuthRoute from "./AuthRoute";
import VerifyOTP from "../Pages/VerifyOTP/VerifyOTP";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
const Tally = lazy(() => import("../Pages/Tally/Tally"));
const SingleClient = lazy(() => import("../Pages/Tally/Client/SingleClient"));
const TransactionDetails = lazy(() =>
  import("../Pages/Tally/TransactionDetails/TransactionDetails")
);
const UserActivity = lazy(() => import("../Pages/UserActivity/UserActivity"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Main />
      </AuthRoute>
    ),
    errorElement: <h1>error</h1>,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <h1 className="min-h-screen flex items-center justify-center">
                Loading...
              </h1>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/tally",
        element: (
          <Suspense
            fallback={
              <h1 className="min-h-screen flex items-center justify-center">
                Loading...
              </h1>
            }
          >
            <Tally />
          </Suspense>
        ),
      },
      {
        path: "/tally/client-details",
        element: (
          <Suspense
            fallback={
              <h1 className="min-h-screen flex items-center justify-center">
                Loading...
              </h1>
            }
          >
            <SingleClient />
          </Suspense>
        ),
      },
      {
        path: "/tally/client-details/transactions",
        element: (
          <Suspense
            fallback={
              <h1 className="min-h-screen flex items-center justify-center">
                Loading...
              </h1>
            }
          >
            <TransactionDetails />
          </Suspense>
        ),
      },
      {
        path: "/user-activity",
        element: (
          <Suspense
            fallback={
              <h1 className="min-h-screen flex items-center justify-center">
                Loading...
              </h1>
            }
          >
            <UserActivity />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/verify/verify-email",
    element: <VerifyOTP />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <h1>error</h1>,
  },
]);
