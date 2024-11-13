import React from "react";
import myRouter from "./Routers/Routers";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
