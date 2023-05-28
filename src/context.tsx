import { createContext } from "react";
import { TypeOfElement } from "./features/elements/elementsTypes";

export interface MyContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (a: boolean) => void;
  selectedOnly: TypeOfElement | null;
  setSelectedOnly: (a: TypeOfElement | null) => void;
}
const contextObj: MyContext = {
  isMenuOpen: false,
  setIsMenuOpen: (newValue) => {},
  selectedOnly: "node",
  setSelectedOnly: (newType) => {},
};

export const MenuContext = createContext<MyContext>(contextObj);
