/* eslint-disable react/prop-types */

import { useEffect } from "react";

export function Timer({ seconds, dispatch }) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(id);
  });

  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
}
