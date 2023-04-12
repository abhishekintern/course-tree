import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Month, Week } from "../components";

const classNames = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const types = [
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Week",
    value: "week",
  },
];

const Home = () => {
  const today = startOfToday();
  const todayMonth = format(today, "MMM-yyyy");
  const [type, setType] = useState(types[0]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(startOfWeek(today));
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  const firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const firstDay = type.value === "month" ? firstDayOfMonth : firstDayOfWeek;

  const days = eachDayOfInterval({
    start: startOfWeek(firstDay),
    end:
      type.value === "month"
        ? endOfWeek(endOfMonth(firstDay))
        : endOfWeek(firstDay),
  });
  // console.log(days)

  const getPrev = (e) => {
    e?.preventDefault();
    const firstDayOfPrev = add(
      firstDay,
      type.value === "month" ? { months: -1 } : { weeks: -1 }
    );
    setCurrMonth(format(firstDayOfPrev, "MMM-yyyy"));
    if (type.value != "month") {
      setFirstDayOfWeek(startOfWeek(firstDayOfPrev));
    }
  };

  const getNext = (e) => {
    e?.preventDefault();
    const firstDayOfNext = add(
      firstDay,
      type.value === "month" ? { months: 1 } : { weeks: 1 }
    );
    setCurrMonth(format(firstDayOfNext, "MMM-yyyy"));
    if (type.value != "month") {
      setFirstDayOfWeek(startOfWeek(firstDayOfNext));
    }
  };

  return (
    <>
      <div
        className={classNames(
          "w-full flex flex-col items-center justify-center p-3 select-none overflow-hidden bg-gray-50",
          type.value === "month" ? "h-screen" : ""
        )}
      >
        <div className="w-full px-4 flex justify-between items-center pb-3">
          <div className="font-semibold text-xl">{currMonth}</div>
          <div className="flex gap-4">
            <Listbox value={type} onChange={setType}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{type.label}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {types.map((type, typeIdx) => (
                      <Listbox.Option
                        key={typeIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={type}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected ? "font-medium" : "font-normal"
                              )}
                            >
                              {type.label}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div
              className="p-2 border rounded-md hover:bg-neutral-200"
              onClick={getPrev}
            >
              <ChevronLeftIcon className="h-6 w-6 text-slate-500" />
            </div>
            <div
              className="p-2 border rounded-md hover:bg-neutral-200"
              onClick={getNext}
            >
              <ChevronRightIcon className="h-6 w-6 text-slate-500" />
            </div>
          </div>
        </div>
        {type.value === "month" ? (
          <Month firstDay={firstDay} days={days} />
        ) : (
          <Week days={days} firstDay={firstDay} />
        )}
      </div>
    </>
  );
};

export default Home;
