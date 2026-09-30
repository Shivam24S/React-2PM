import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Service from "./components/Service";
import Product from "./components/Product";
import ErrorPage from "./components/Error";
import Form from "./components/Form";
import { Suspense } from "react";
import Loading from "./components/Loading";

const App = () => {
  const Home = lazy(() => import("./components/Home"));

  const About = lazy(() => import("./components/About"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "service",
          element: <Service />,
        },
        {
          path: "pro/:id",
          element: <Product />,
        },
        {
          path: "auth",
          element: <Form />,
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};

export default App;
