import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AuthRoute from "./AuthRoute";
const Tally = lazy(() => import("../Pages/Tally/Tally"));
const SingleClient = lazy(() => import("../Pages/Tally/Client/SingleClient"));
const TransactionDetails = lazy(() =>
  import("../Pages/Tally/TransactionDetails/TransactionDetails")
);

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
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/tally",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Tally />
          </Suspense>
        ),
      },
      {
        path: "/tally/client-details",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <SingleClient />
          </Suspense>
        ),
      },
      {
        path: "/tally/client-details/transactions",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <TransactionDetails />
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
]);
