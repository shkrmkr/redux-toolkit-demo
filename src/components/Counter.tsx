import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Counter: React.FC = () => {
  const counter = useSelector<RootState, RootState["actionCounter"]>(
    (state) => state.actionCounter
  );

  return (
    <div>
      <h3>Action counter: {counter}</h3>
    </div>
  );
};
