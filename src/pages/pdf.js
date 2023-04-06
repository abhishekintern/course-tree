import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Head from "next/head";
import { useState } from "react";
const PPT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const handlePDFChange = (event) => {
    const file = event.target.files[0];
    setFileUrl(window.URL.createObjectURL(file));
  };
  const handlePPTXChange = async () => {};
  return (
    <>
      <Head>
        <title>Upload and View PPT/PPTX Files</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-slate-50 flex justify-center space-y-2 flex-col min-h-screen">
        <div className="flex flex-col space-y-2 justify-center">
          <h1 className="text-2xl text-center">Upload and View PDF Files</h1>
          <div className="flex justify-center">
            <input
              type="file"
              className="font-bold text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
              accept=".pdf"
              onChange={handlePDFChange}
            />
          </div>
        </div>

        <div className="flex justify-center h-2/3 items-center bg-slate-200">
          {fileUrl && (
            <DocViewer
              className="max-w-xl border-2 border-black rounded"
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: fileUrl }]}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default PPT;
