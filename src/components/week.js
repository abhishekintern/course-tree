import { format, isSameMonth, isToday, roundToNearestMinutes } from "date-fns";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
const classNames = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const CalendarGPT = ({ days, firstDay }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const formattedTime = format(
    roundToNearestMinutes(new Date(), { nearestTo: 30 }),
    "p"
  );
  // console.log(formattedTime);

  return (
    <div className="grid grid-cols-8 w-full bg-white">
      {/* Header */}
      <div className="border" />
      {days.map((day) => {
        return (
          <div
            key={day}
            className={classNames(
              "col-span-1 border-y flex justify-center items-center text-sm text-gray-400 sm:flex-row flex-col py-2",
              !isSameMonth(day, firstDay) ? "bg-gray-50 border" : "bg-white"
            )}
          >
            <h2 className="font-semibold flex items-center">
              {format(day, "EEE")}
            </h2>
            <p
              className={classNames(
                "text-gray-900 font-semibold flex items-center justify-center h-8 w-8 rounded-full",
                isToday(day) ? "bg-indigo-500 text-white mx-2" : ""
              )}
            >
              {format(day, "d")}
            </p>
          </div>
        );
      })}
      {/* Time slots */}
      <div className="col-span-1 border-l">
        {Array.from({ length: 24 }, (_, i) => {
          return (
            <div
              key={i}
              className="h-28 flex items-start justify-center pr-2 border-b ttext-xs leading-5 text-gray-400"
            >
              {i % 12 === 0 ? 12 : i % 12}:00 {i < 12 ? "AM" : "PM"}
            </div>
          );
        })}
      </div>
      {/* Calendar cells */}
      {days.map((day) => (
        <div key={day} className="col-span-1">
          {Array.from({ length: 48 }, (_, i) => {
            const hour = Math.floor(i / 2) % 12 || 12;
            const minute = i % 2 ? "30" : "00";
            let time = `${hour + ":" + minute + (i > 23 ? " PM" : " AM")}`;
            let date = format(day, "PPP");
            //   console.log(time);
            return (
              <div
                key={i}
                className={classNames(
                  "h-14 flex items-center cursor-pointer border hover:bg-gray-200 transition",
                  !isSameMonth(day, firstDay) ? "bg-gray-50" : "bg-white"
                )}
                //   onClick={() => handleEventAdd(time, date)}
                onClick={() => {
                  // console.log(time);
                  alert("Event added for " + date + " " + time);
                }}
              >
                {formattedTime == time && (
                  <span className="w-full bg-red-500 h-0.5"></span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGPT;
