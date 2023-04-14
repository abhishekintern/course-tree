import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
const classNames = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const DragNDrop = ({
  label = "Upload a CSV file",
  onFileChange = console.log,
  formats = ["csv"],
  formatType = "csv",
  maxSize = 1,
  src = null,
  ...props
}) => {
  const dropRef = useRef();
  const dragCounter = useRef(0);
  const dropHeight = useRef();
  const dragging = useRef();
  const [file, setFile] = useState(src);

  const fileLink = useMemo(
    () =>
      file === src
        ? src
        : file
        ? Object.prototype.toString.call(file) === "[object String]"
          ? file
          : URL.createObjectURL(file)
        : null,
    [file, src]
  );

  const inputLabel = useMemo(() => {
    label ? label.replace(" ", "-").toLowerCase() : "image";
  }, [label]);

  const fileSizeValid = useCallback(
    (fileSize) => {
      console.log(parseInt(fileSize / 1024));
      if (parseInt(fileSize / 1024) <= maxSize * 1000) return true;
      return false;
    },
    [maxSize]
  );

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
      dragging.current = true;
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) dragging.current = false;
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = false;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const inputFile = e.dataTransfer.files[0];
      if (fileSizeValid(inputFile.size)) {
        setFile(inputFile);
        onFileChange({
          target: {
            id: props.id,
            files: e.dataTransfer.files,
            type: "file",
          },
        });
        e.dataTransfer.clearData();
        dragCounter.current = 0;
      }
    }
  };

  const handleFileInput = (e) => {
    const inputFile = e.target.files[0];
    if (fileSizeValid(inputFile.size)) {
      setFile(inputFile);
      onFileChange(e);
    }
  };

  const removeFile = () => {
    setFile();
    onFileChange({
      target: {
        id: props.id,
        files: [],
        type: "file",
      },
    });
  };

  useEffect(() => {
    const dropDiv = dropRef.current;
    dropHeight.current = dropDiv.offsetHeight;
    dropDiv.addEventListener("dragenter", handleDragIn);
    dropDiv.addEventListener("dragleave", handleDragOut);
    dropDiv.addEventListener("dragover", handleDrag);
    dropDiv.addEventListener("drop", handleDrop);
    return () => {
      dropDiv.removeEventListener("dragenter", handleDragIn);
      dropDiv.removeEventListener("dragleave", handleDragOut);
      dropDiv.removeEventListener("dragover", handleDrag);
      dropDiv.removeEventListener("drop", handleDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="h-[500px] flex flex-col">
        <div
          className={classNames(
            "mt-1 rounded-md border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 overflow-hidden transition-all duration-300",
            file
              ? "group relative border shadow"
              : "flex-grow border-2 border-dashed"
          )}
          ref={dropRef}
        >
          {!file ? (
            <div className="h-full w-full space-y-1 flex items-center justify-center flex-col text-center aspect-[3/1] p-4">
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col text-sm text-slate-600">
                <label
                  htmlFor={props.id}
                  className="relative flex flex-col cursor-pointer rounded-md font-medium text-purple-500 focus-within:outline-none focus-within:ring-0 dark:text-purple-400"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileInput}
                    accept={formats
                      ?.map((format) => `${formatType}/${format}`)
                      .join(", ")}
                    {...props}
                  />
                </label>
              </div>
              <p className="text-xs text-slate-500">
                <span className="uppercase">{formats.join(", ")}</span> up to{" "}
                {maxSize}MB
              </p>
            </div>
          ) : fileLink ? (
            <>
              <div className="h-full w-full relative aspect-video">
                <Image
                  src={fileLink}
                  alt={label}
                  fill
                  priority
                  className="group-hover:blur-sm group-hover:opacity-50 object-contain transition-all duration-300"
                />
              </div>
              <div
                className="w-full h-full absolute inset-0 group-hover:scale-100 scale-0 transition-all duration-300 flex items-center justify-center z-10 cursor-pointer"
                onClick={removeFile}
              >
                <TrashIcon className="h-8 w-8 text-red-500" />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DragNDrop;
