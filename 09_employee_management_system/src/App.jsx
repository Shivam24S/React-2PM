import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Error from "./ui/Error";
import { lazy, Suspense } from "react";
import Loading from "./ui/Loading";
import EmployeeForm from "./components/EmployeeForm";
import ToastProvider from "./ui/ToastProvider";

const Employee = lazy(() => import("./components/Employee"));

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
      {
        path: "/add",
        element: <EmployeeForm />,
      },
      {
        path: "/edit/:id",
        element: <EmployeeForm />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ToastProvider>
      <Suspense fallback={<Loading fullPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </ToastProvider>
  );
};

export default App;
