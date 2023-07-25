import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import AddFeedback from "./pages/AddFeedback";
import "./App.css";
import EditFeedback from "./pages/EditFeedback";
import Roadmap from "./pages/Roadmap";
import { modifiedLink } from "./lib/link-helper";
function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: `/detail/:${modifiedLink("feedback")}`,
          element: <Feedback />,
          errorElement: <h1>Error</h1>,
        },
        {
          path: "/add-feedback",
          element: <AddFeedback />,
        },
        { path: "/edit/:edit", element: <EditFeedback /> },
        { path: "/roadmap", element: <Roadmap /> },
      ],
      errorElement: <h1>Error</h1>,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
