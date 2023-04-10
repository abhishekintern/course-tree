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
    if (type.value === "month")
      setCurrMonth(format(firstDayOfPrev, "MMM-yyyy"));
    else setFirstDayOfWeek(startOfWeek(firstDayOfPrev));
  };

  const getNext = (e) => {
    e?.preventDefault();
    const firstDayOfNext = add(
      firstDay,
      type.value === "month" ? { months: 1 } : { weeks: 1 }
    );
    if (type.value === "month")
      setCurrMonth(format(firstDayOfNext, "MMM-yyyy"));
    else setFirstDayOfWeek(startOfWeek(firstDayOfNext));
  };

  const goToToday = () => {
    setCurrMonth(format(today, "MMM-yyyy"));
    setFirstDayOfWeek(startOfWeek(today));
  };

  return (
    <>
      <div
        className={classNames(
          "w-screen flex flex-col items-center justify-center py-3 select-none overflow-hidden",
          type.value === "month" ? "h-screen" : ""
        )}
      >
        <div className="w-full px-4 flex justify-between items-center mb-3">
          <div className="text-base font-semibold leading-6 text-gray-900">
            {format(firstDay, "MMMM yyyy")}
          </div>
          <div className="flex gap-4 items-center">
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

            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <div
                className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
                aria-hidden="true"
              />
              <button
                type="button"
                className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon
                  onClick={getPrev}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={goToToday}
                className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 md:block"
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon
                  onClick={getNext}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
            <button
              type="button"
              className="rounded-md h-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button>
          </div>
        </div>
        {type.value === "month" ? (
          <Month firstDay={firstDay} days={days} />
        ) : (
          <Week days={days} />
        )}
      </div>
    </>
  );
};

export default Home;
