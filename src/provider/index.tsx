"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface Props {
    children?:React.ReactNode
}

export const NextAuthSessionProvider = ({ children }:Props) => {
  return (
    <SessionProvider refetchOnWindowFocus refetchInterval={5 * 60}>
      {children}
    </SessionProvider>
  );
};
