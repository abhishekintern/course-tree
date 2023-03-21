import Link from "next/link";
import { useState } from "react";
import Chapter from "./Chapter";
import ToggleArrow from "./ToggleArrow";

const Subject = ({ subject }) => {
  const [toggleChildrenArrow, setToggleChildrenArrow] = useState(false);

  return (
    <div className="pl-2.5">
      <div onClick={() => setToggleChildrenArrow(!toggleChildrenArrow)} className="flex items-center justify-between hover:text-gray-700 rounded transition-all cursor-pointer">
        <div className="flex items-center relative">
          <span className="-inset-x-2 absolute w-[10px] h-[2px] bg-pink-300"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#A78BFA"
            className="w-6 h-6 p-1.5 bg-violet-100 rounded-full z-10"
          >
            <path
              fillRule="evenodd"
              d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
              clipRule="evenodd"
            />
            <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
          </svg>
          {/* {subject.children.length >= 1 && toggleChildrenArrow && (
            <span className="inset-x-2.5 inset-y-[30px] absolute w-[2px] h-[10px] bg-violet-400"></span>
          )} */}
          <Link href={"/"} className="m-2">
            {subject.title}
          </Link>
        </div>
        {/* ARROW ICON SVG -------------------------- */}
        {subject.children.length >= 1 && (
          <ToggleArrow
            toggleArrow={toggleChildrenArrow}
            setToggleArrow={setToggleChildrenArrow}
          />
        )}
      </div>
      {toggleChildrenArrow && (
        <div className="pl-2.5 relative">
          <span className="absolute -inset-y-[18px] bg-violet-300 w-[2px] h-full"></span>
          {/* CHAPTERS MAP FUNCTION */}

          {subject.children.map((chapter) => {
            // console.log(chapter);
            return <Chapter key={chapter._id} {...{ chapter }} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Subject;
