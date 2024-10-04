"use client";

import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import { UserData } from "../types/Context";

export const GlobalState = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>();
  const getUserData = async () => {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/data`,
      { withCredentials: true }
    );
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resp.data.token}`;
    const user = resp.data;
    setUser(user);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <GlobalContext.Provider value={{ user }}>{children}</GlobalContext.Provider>
  );
};
