import { createContext } from "react";
import { ConnectionType } from "./features/elements/elementsTypes";

export interface MyContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (a: boolean) => void;
}
const contextObj: MyContext = {
  isMenuOpen: false,
  setIsMenuOpen: (newValue) => {},
};

export const MenuContext = createContext<MyContext>(contextObj);
