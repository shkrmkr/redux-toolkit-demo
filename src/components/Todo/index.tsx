import React from "react";
import { Dashboard } from "./Dashboard";
import { Header } from "./Header";

export const Todo: React.FC = () => {
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
};
