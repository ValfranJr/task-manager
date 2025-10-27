import { forwardRef } from "react";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        ref={ref}
        {...rest}
        className="outline-brand-primary placeholder:text-brand-text-gray border-brand-light-gray mt-1 w-full rounded-lg border-1 px-4 py-3 placeholder:text-sm"
      />
      {errorMessage && (
        <InputErrorMessage>{errorMessage}</InputErrorMessage>
      )}{" "}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
