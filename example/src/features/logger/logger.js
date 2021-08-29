import React, { useState, useRef } from "react";
import TextInput from "../../lego/inputs/textinput";

export default function Logger(Component) {
  const NewComponent = (props) => {
    const [timeStart, setTimeStart] = useState();
    const [timeEnd, setTimeEnd] = useState();
    const [isMouseOver, setIsMouseOver] = useState(false);
    const { forwardedRef, ...rest } = props;
    return (
      <div
        onMouseEnter={(e) => {
          setTimeStart(new Date().getTime());
          setIsMouseOver(true);
        }}
        onMouseLeave={(e) => {
          setTimeEnd(new Date().getTime());
          setIsMouseOver(false);
          console.log(`Time spent: ${Math.abs(timeEnd - timeStart) / 1000}s`);
        }}
        style={{ border: isMouseOver ? "1px solid" : "none" }}
      >
        <Component ref={forwardedRef} {...rest} />
      </div>
    );
  };

  return React.forwardRef((props, refs) => (
    <NewComponent {...props} forwardRef={refs} />
  ));
}
