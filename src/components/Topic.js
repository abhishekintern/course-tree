import React from "react";

const Topic = ({ topic }) => {
  return (
    <div className="font-normal border-l-2 border-cyan-400 py-1 px-3 relative">
      <div className="flex items-center">
        <span className="absolute inset-x-0 w-[12px] h-[2px] bg-cyan-400"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="#FB7185"
          className="w-6 h-6 p-1.5 bg-red-100 rounded-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>

        <span className="ml-2">{topic.title}</span>
      </div>
    </div>
  );
};

export default Topic;
