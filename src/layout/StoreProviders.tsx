"use client";
import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
