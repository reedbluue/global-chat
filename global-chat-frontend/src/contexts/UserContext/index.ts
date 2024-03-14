import {createContext} from "react";

export interface IUserContextData {
  username?: string;
  setUsername: (username: string) => void;
}

export const UserContext = createContext<IUserContextData>({} as IUserContextData);