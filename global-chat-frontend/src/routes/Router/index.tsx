import {createBrowserRouter} from "react-router-dom";
import {BaseView} from "../../views/BaseView";
import {LoginPage} from "../../pages/LoginPage";
import {ChatPage} from "../../pages/ChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseView/>,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path: "/chat",
        element: <ChatPage/>
      }
    ]
  },
]);