import React, { useState, useEffect, useRef } from "react";

export default function useHover() {
  const [timeEnter, setTimeEnter] = useState();
  const ref = useRef(null);
  const handleMouseEnter = () => {
    setTimeEnter(new Date().getTime());
  };
  const handleMouseLeave = () => {
    console.log(
      `Time hover: ${Math.abs(new Date().getTime() - timeEnter) / 1000}s`
    );
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseEnter);
      node.addEventListener("mouseout", handleMouseLeave);
    }
    return () => {
      node.removeEventListener("mouseover", handleMouseEnter);
      node.removeEventListener("mouseout", handleMouseLeave);
    };
  });
  return ref;
}
