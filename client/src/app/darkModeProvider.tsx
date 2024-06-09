
"use client";

import { useAppSelector } from "./redux";
import { useEffect } from "react";

const DarkMode = ({ children }: any) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default DarkMode;
