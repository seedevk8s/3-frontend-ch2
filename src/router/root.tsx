import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const Loading = () => <div>Loading...</div>;

const Main = lazy(() => import("../pages/mainPage"));


const router = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={<Loading />}><Main /></Suspense>,
  },
]);

export default router;