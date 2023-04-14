import { useState } from "react";

const CSVTOJSON = () => {
  const [jsonResult, setJsonResult] = useState([]);

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const csvData = await file.text();
    // console.log(csvData);
    const { cols, result } = csvToJSON(csvData);
    // console.log(cols);
    console.log(result);
  };

  function csvToJSON(csv) {
    const lines = csv
      .split("\n")
      .map((line) => line.replaceAll("\r", ""))
      .filter((line) => {
        const temp = line.replaceAll(",", "");
        return temp.trim().length;
      });
    const result = [];
    const headers = lines[0]
      .split(",")
      .map((header) => header?.replaceAll('"', ""));
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j]?.replaceAll('"', "");
      }
      result.push(obj);
    }
    const cols = [];
    for (let i = 0; i < result.length; i++) {
      for (const k in result[i]) {
        if (!cols.includes(k)) {
          cols.push(k);
        }
      }
    }
    return {
      cols: cols.map((col) => ({
        field: col,
        label: col,
      })),
      result,
    };
  }

  return (
    <div>
      <div>
        <hr />
        <h1>WITHOUT USING MODULE</h1>
        <input type="file" accept=".csv" onChange={handleOnChange} />
        <div>
          <pre>{JSON.stringify(setJsonResult)}</pre>
        </div>
      </div>
    </div>
  );
};

export default CSVTOJSON;
