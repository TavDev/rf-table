import React, { useState, useEffect } from "react";
import useHover from "../../hooks/useHover";

export default function TextInput(props) {
  const [text, setText] = useState("");
  const hoverRef = useHover();
  const ref = React.createRef();
  useEffect(() => {
    if (props.value) {
      setText(props.value);
    }
  }, []);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      ref={hoverRef}
    />
  );
}
