import {Outlet} from "react-router-dom";
import {UserProvider} from "../../providers/UserProvider";

export const BaseView = () => {
  return (
      <UserProvider>
        <div className={"w-screen h-screen flex flex-col p-10"}>
          <Outlet/>
        </div>
      </UserProvider>
  );
}