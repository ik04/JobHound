import { createContext } from "react";
import { ContextValue } from "../types/Context";

export const GlobalContext = createContext<Partial<ContextValue>>({});
// ! i know this is a crime
