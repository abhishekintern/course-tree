import { format, isToday } from "date-fns";
import { twMerge } from "tailwind-merge";

const classNames = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const num2time = (num) => {
  if (num < 100) num *= 100;
  const [_, hh, mm] = num.toString().match(/(\d{1,2})(\d{2})$/);
  return `${hh.padStart(2, "0")}:${mm}`;
};

const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const Week = ({ days }) => {
  return (
    <>
      <div className="w-full h-noHeader overflow-hidden">
        <div className="w-full flex border rounded-t-md overflow-hidden">
          <div className="flex w-16 justify-center border hover:bg-neutral-100">
            <div
              className={classNames(
                "h-8 w-8 flex justify-center items-center rounded-full text-slate-900"
              )}
            ></div>
          </div>
          {days.map((d, idx) => (
            <div
              key={d}
              className={classNames(
                "h-fit py-2 flex-1 flex justify-center border hover:bg-neutral-100",
                isToday(d) ? "bg-gray-100" : ""
              )}
              onClick={() => alert(format(d, "dd-MM-yyyy"))}
            >
              <div className="flex sm:flex-row flex-col justify-center items-center gap-2">
                <span className="font-semibold capitalize">
                  {dayNames[idx]}
                </span>
                <span
                  className={classNames(
                    "flex justify-center items-center rounded-full text-slate-900",
                    isToday(d) ? "h-8 w-8 bg-indigo-500 text-white" : ""
                  )}
                >
                  {format(d, "d")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full w-full overflow-x-hidden scrollbar-hide">
          {Array.from({ length: 24 }).map((_, i) => {
            // console.log(num2time(0));
            // let time = (i + 1) % 12;
            // if (time === 0) time = 12;
            // if (i <= 12) time += " AM";
            // else time += " PM";
            let time = num2time(i + 1);
            return (
              <div
                key={i}
                className={classNames(
                  "w-full flex border overflow-hidden",
                  i === 23 ? "rounded-b-md" : ""
                )}
              >
                <div className="flex w-16 items-center justify-center border hover:bg-neutral-100">
                  <div className="flex justify-center items-center text-slate-900">
                    {time}
                  </div>
                </div>
                {days.map((d, idx) => (
                  <div
                    key={i + idx}
                    className="w-full flex-1 aspect-video flex justify-center border hover:bg-neutral-100"
                    onClick={() => alert(format(d, "PPpp") + " @ " + time)}
                  >
                    <div className="flex justify-center items-center gap-2"></div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Week;
