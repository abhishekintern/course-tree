import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Head from "next/head";
import { useState } from "react";
const PPT = () => {
  const [fileUrl, setFileUrl] = useState("/DOcSAbHi.pdf");
  const handlePDFChange = (event) => {
    const file = event.target.files[0];
    setFileUrl(window.URL.createObjectURL(file));
  };
  const handlePPTXChange = async () => {};
  return (
    <div>
      {" "}
      <Head>
        {" "}
        <title>Upload and View PPT/PPTX Files</title>{" "}
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>{" "}
      <main>
        {" "}
        <div>
          {" "}
          <h1>Upload and View PDF Files</h1>{" "}
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handlePDFChange}
          />{" "}
        </div>{" "}
        {fileUrl && (
          <div className="flex justify-center items-center">
            {" "}
            <DocViewer
              className="max-w-2xl max-h-2xl border-2 border-black"
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: fileUrl }]}
            />{" "}
          </div>
        )}{" "}
      </main>{" "}
    </div>
  );
};
export default PPT;
