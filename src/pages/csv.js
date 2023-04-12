import React, { useState } from "react";
import Papa from "papaparse";

const CSVTOJSON = () => {
  const [result, setResult] = useState([]);
  const handleOnClick = (e) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          console.log(results);
          setResult(results.data);
        },
      });
    }
  };
  return (
    <div>
      CSVTOJSON
      <input type="file" accept=".csv" onChange={handleOnClick} />
      <div>
        {result.map((json, index) => {
          return (
            <p key={index}>
              {index != 0 && json.length > 1 && JSON.stringify(json)}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default CSVTOJSON;
