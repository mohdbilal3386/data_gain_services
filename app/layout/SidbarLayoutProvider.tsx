"use client";
import React from "react";
import SideBar from "../components/Sidebar";
const SidbarLayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <SideBar>{children}</SideBar>;
};

export default SidbarLayoutProvider;
