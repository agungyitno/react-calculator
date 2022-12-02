import React from "react";
import { Textfit } from "react-textfit";
import "./Screen.css";

export default function Screen({ prev, curr }) {
  return (
    <div className="screen">
      <Textfit className="prev" mode="single" max={25}>
        {prev}
      </Textfit>
      <Textfit className="curr" mode="single" max={50}>
        {curr}
      </Textfit>
    </div>
  );
}
