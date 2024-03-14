import {PropsWithChildren, useState} from "react";
import {UserContext} from "../../contexts/UserContext";

export const UserProvider = ({children}: PropsWithChildren) => {
  const [username, setUsername] = useState<string>();

  const setUsernameImpl = (username: string) => {
    setUsername(username);
  }

  return (
      <UserContext.Provider
          value={{username, setUsername: setUsernameImpl}}
      >
        {children}
      </UserContext.Provider>
  );
}