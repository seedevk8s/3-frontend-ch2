import { lazy, Suspense } from "react";

const Loading = () => <div>Loading...</div>;
const TodoIndex = lazy(() => import("../pages/todo/indexPage"));

const todoRouter = () => {

  return (
    {
      path: "todo",
      element: <Suspense fallback={<Loading/>}><TodoIndex /></Suspense>,
    }
  )
}

export default todoRouter;