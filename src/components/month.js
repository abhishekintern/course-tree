import { format, isSameMonth, isToday } from "date-fns";
import { twMerge } from "tailwind-merge";

const classNames = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const Month = ({ days, firstDay }) => {
  return (
    <>
      <div className="w-full grid grid-cols-7 bg-white border rounded-t-md overflow-hidden">
        {dayNames.map((day, idx) => {
          return (
            <div
              key={day}
              className="py-4 flex justify-center items-center border"
            >
              <div className="font-semibold capitalize">{day}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-full grid grid-cols-7 border rounded-b-md overflow-hidden">
        {days?.map((d) => (
          <div
            key={d}
            className={classNames(
              "w-full flex justify-center border hover:bg-neutral-100",
              !isSameMonth(d, firstDay) ? "bg-gray-50" : "bg-white"
            )}
            onClick={() => alert(format(d, "dd-MM-yyyy"))}
          >
            <div
              className={classNames(
                "h-8 w-8 flex justify-center items-center rounded-full text-slate-900",
                isToday(d) ? "bg-indigo-500 text-white" : "",
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
