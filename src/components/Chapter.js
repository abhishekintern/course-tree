import React, { useState } from "react";
import ToggleArrow from "./ToggleArrow";
import Topic from "./Topic";

const Chapter = ({ chapter }) => {
  const [toggleTopicArrow, setToggleTopicArrow] = useState(false);
  return (
    <div className="pl-4 py-1.5 flex flex-col border-l-2 border-violet-400 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="absolute inset-x-0 inset-y-5 w-[16px] h-[2px] bg-violet-400"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#38BDF8"
            className="w-6 h-6 p-1.5 bg-cyan-100 rounded-full"
          >
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>

          <span className="ml-2">{chapter.title}</span>
        </div>
        {/* ARROW ICON SVG -------------------------- */}
        {chapter.children.length >= 1 && (
          <ToggleArrow
            toggleArrow={toggleTopicArrow}
            setToggleArrow={setToggleTopicArrow}
          />
        )}
      </div>
      {toggleTopicArrow && (
        <div className="pl-2.5">
          {/* CHAPTERS MAP FUNCTION */}

          {chapter.children.map((topic) => {
            // console.log("TOPIC ", topic);
            return <Topic key={topic._id} {...{ topic }} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Chapter;
