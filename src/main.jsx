import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "./pages/Home.jsx";
import TasksDetailsPage from "./pages/TaskDetails.jsx";
import TasksPage from "./pages/Tasks.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
  },
  {
    path: "/tasks/:taskId",
    element: <TasksDetailsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={{ style: { color: "#00ADB5" } }} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
