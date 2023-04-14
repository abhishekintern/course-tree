import { utils, writeFileXLSX } from "xlsx";

const generateXLSX = (data) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  writeFileXLSX(workbook, "template.xlsx");
};
const files = {
  terms: [
    {
      title: "",
      details: "",
      mode: "",
      status: "",
      coverImage: "",
      priority: "",
    },
  ],
  subjects: [
    {
      title: "",
      details: "",
      mode: "",
      status: "",
      coverImage: "",
      priority: "",
    },
  ],
  topics: [{ title: "", details: "", priority: "" }],
  chapters: [
    { title: "", details: "", status: "", coverImage: "", priority: "" },
  ],
};

const JSONTOEXCEL = () => {
  const jsonData = files.topics;

  const downloadCsv = () => {
    if (!jsonData) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(jsonData[0]).join(",") +
      "\n" +
      jsonData.map((row) => Object.values(row).join(",")).join("\n");
    // console.log(jsonData.map((row) => Object.values(row).join(",")).join("\n"));
    // console.log(csvContent);

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "topic.csv";
    link.click();
  };

  return (
    <div>
      JSONTOEXCEL
      <button className="bg-red-200" onClick={() => generateXLSX(files.topics)}>
        DOWNLOAD
      </button>
      <hr />
      <h1>WITHOUT USING MODULES</h1>
      <button className="bg-green-200" onClick={downloadCsv}>
        WITHOUT MODULE{" "}
      </button>
    </div>
  );
};

export default JSONTOEXCEL;
