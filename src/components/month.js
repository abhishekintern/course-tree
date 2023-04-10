import Head from "next/head";
import Image from "next/image";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const classNames = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const Month = ({ days, firstDay }) => {
  return (
    <>
      <div className="w-full grid grid-cols-7 gap-px border border-gray-300 bg-gray-200 text-center text-xs font-bold leading-6 text-gray-700 lg:flex-none">
        {dayNames.map((day, idx) => {
          return (
            <div key={day} className="bg-white py-2">
              <div className="capitalize">{day}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-full grid grid-cols-7 border rounded-b-md overflow-hidden">
        {days?.map((d) => (
          <div
            key={d}
            className={classNames(
              "flex flex-col bg-white px-3 py-2 text-indigo-600 hover:bg-gray-100 focus:z-10 border",
              !isSameMonth(d, firstDay) ? "bg-gray-100" : ""
            )}
            onClick={() => alert(format(d, "dd-MM-yyyy"))}
          >
            <div
              className={classNames(
                "ml-auto sm:ml-0 w-6 h-6 flex justify-center items-center rounded-full text-slate-900",
                isToday(d) ? "bg-indigo-500 text-white font-semibold" : "",
                !isSameMonth(d, firstDay) ? "text-slate-500" : ""
              )}
            >
              {format(d, "d")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Month;
