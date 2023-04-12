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
  return (
    <div>
      JSONTOEXCEL
      <button className="bg-red-200" onClick={() => generateXLSX(files.topics)}>
        DOWNLOAD
      </button>
    </div>
  );
};

export default JSONTOEXCEL;
