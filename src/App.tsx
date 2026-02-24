import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./router";
import "./App.css";

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
