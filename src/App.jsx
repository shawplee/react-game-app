import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MatchCardsGame from "./pages/MatchCardsGame";
import Error404 from "./pages/Error404";
import ShowHighScores from "./pages/ShowHighScores";
import About from "./pages/About";
import Header from "./components/Header";

/* add react route here and show it works.  High Scores is yet to be fixed */

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MatchCardsGame />,
      errorElement: <Error404 />
    },
    {
      path: "/scores",
      element: <div><Header /><ShowHighScores /></div>
    },
    {
      path: "/about",
      element: <About />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
