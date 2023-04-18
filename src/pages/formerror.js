import React, { useState } from "react";

let object = {
  0: {
    priority: {
      _errors: [
        "Expected Number received null",
        "Expected String received null",
      ],
    },
    _errors: [],
  },
  1: {
    title: { _errors: ["Expected String received null"] },
    _errors: [],
  },
  _errors: [],
};

const FormError = () => {
  const [formError, setFormError] = useState(false);

  const giveFormError = () => {
    setFormError(object);
  };

  const removeError = () => {
    setFormError(false);
  };

  // This function flattens the error messages array into a single array
  // that can be displayed in the component
  const getErrors = (errorObject) => {
    const errors = [];
    // console.log(errorObject);
    Object.values(errorObject).forEach((value, i) => {
      Object.entries(value).map((entry) => {
        if (entry[1].length == 0) {
          return;
        } else {
          // console.log(entry[0]);
          errors.push(entry[0]);
        }
      });
    });
    // console.log(errors);
    return errors;
  };

  return (
    <div>
      <h1>FORM ERROR</h1>
      <button onClick={giveFormError}>CLICK ME to give form ERROR</button>
      <button onClick={removeError}>Remove Error</button>

      {formError && (
        <p>
          Error occured in{" "}
          <span className="capitalize">
            {getErrors(formError).join(" and ")}
          </span>{" "}
          in CSV file
        </p>
      )}
    </div>
  );
};

export default FormError;
