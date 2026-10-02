import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Error from "./ui/Error";
import { lazy, Suspense } from "react";
import Loading from "./ui/Loading";

const Employee = lazy(() => import("./components/Employee"));

const BASEURL = import.meta.env.VITE_BASE_URL;

console.log("baseUrl", BASEURL);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Employee />,
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
