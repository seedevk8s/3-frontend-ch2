import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: "",
    element: <div>Hello world</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>,
)
