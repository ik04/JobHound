"use client";

import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import { UserData } from "../types/Context";

export const GlobalState = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const getUserData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/data`,
        { withCredentials: true }
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${resp.data.token}`;
      const user = resp.data;
      setUser(user);
    } catch (err: any) {
      console.log("data fetch failed");
    }
  };
  const checkIfMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    getUserData();
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  return (
    <GlobalContext.Provider value={{ user, isMobile }}>
      {children}
    </GlobalContext.Provider>
  );
};
