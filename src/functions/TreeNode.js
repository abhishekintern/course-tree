import ArrowIcon from "@/svgs/ArrowIcon";
import ChaptersIcon from "@/svgs/ChaptersIcon";
import SubjectsIcon from "@/svgs/SubjectsIcon";
import TermsIcon from "@/svgs/TermsIcon";
import TopicsIcon from "@/svgs/TopicsIcon";
import { Transition } from "@headlessui/react";
import Link from "next/link";

const icons = {
  terms: () => <TermsIcon />,
  subjects: () => <SubjectsIcon />,
  chapters: () => <ChaptersIcon />,
  topics: () => <TopicsIcon />,
};
const attr = {
  terms: { color: "pink", preColor: "pink" },
  subjects: { color: "violet", preColor: "pink" },
  chapters: { color: "cyan", preColor: "violet" },
  topics: { color: "red", preColor: "cyan" },
};

function TreeNode({ node }) {
  let color = attr[node.hierarchyLevel].color;
  let preColor = attr[node.hierarchyLevel].preColor;
  const Icon = icons[node.hierarchyLevel];

  return (
    <>
      {!node.children && (
        <div className="font-normal py-1 px-3 relative w-auto">
          <div
            className={`flex items-center hover:text-gray-700 rounded transition-all`}
          >
            <span
              className={`absolute inset-x-0.5 w-3 h-0.5 bg-${preColor}-300`}
            ></span>
            <Icon />
            <Link href={"#"} className="ml-2 w-fit">
              {node.title}ajksndlk jhalskjdhlkuah slduih lauksh dlukahsldia
              sidhl
            </Link>
          </div>
        </div>
      )}
      <div className="pl-2.5">
        {node.children && (
          <details
            className={`flex items-center justify-between hover:text-gray-700 rounded transition-all cursor-pointer font-medium text-xs relative`}
          >
            <summary className="flex items-center relative justify-between">
              <div className="flex items-center relative">
                {node.hierarchyLevel != "terms" && (
                  <span
                    className={`-inset-x-2 absolute w-2.5 h-0.5 bg-${preColor}-300`}
                  ></span>
                )}
                <Icon />
                <Link href={"#"} className="m-2">
                  {node.title}
                </Link>
              </div>
              {node.children.length >= 1 && <ArrowIcon />}
            </summary>
            <Transition show={true}>
              <Transition.Child
                enter="transition-all duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all duration-350"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="pl-3 relative">
                  <span
                    className={`absolute inset-x-3.5 -inset-y-4 bg-${color}-300 w-0.5 h-full`}
                  ></span>
                  {node.children.map((childNode) => (
                    <TreeNode key={childNode._id} node={childNode} />
                  ))}
                </div>
              </Transition.Child>
            </Transition>
          </details>
        )}
      </div>
    </>
  );
}

export default TreeNode;
