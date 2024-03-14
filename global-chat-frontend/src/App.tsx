import {RouterProvider} from "react-router-dom";
import {router} from "./routes/Router";

export const App = () => {
  return (<RouterProvider router={router}/>);
}