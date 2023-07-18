import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.title}:</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        onChange={props.handleInputChange}
        ref={ref}
      />
    </div>
  );
});

export default Input;
