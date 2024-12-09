import React from "react";
import myRouter from "./Routers/Routers";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const myClient = new QueryClient();
  return (
    <QueryClientProvider client={myClient}>
      <RouterProvider router={myRouter} />
    </QueryClientProvider>
  );
}

export default App;
