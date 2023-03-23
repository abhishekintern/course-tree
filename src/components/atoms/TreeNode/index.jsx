import ChaptersIcon from "@/svgs/chapter";
import CourseIcon from "@/svgs/course";
import SubjectsIcon from "@/svgs/subject";
import TermsIcon from "@/svgs/term";
import TopicsIcon from "@/svgs/topic";
import classNames from "@/utils/classNames";
import { Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

const nodeAttrs = {
	course: {
		preColor: "brand",
		color: "brand",
		icon: (props) => <CourseIcon {...props} />,
	},
	term: {
		preColor: "pink",
		color: "brand",
		icon: (props) => <TermsIcon {...props} />,
	},
	subject: {
		preColor: "purple",
		color: "pink",
		icon: (props) => <SubjectsIcon {...props} />,
	},
	chapter: {
		preColor: "blue",
		color: "purple",
		icon: (props) => <ChaptersIcon {...props} />,
	},
	topic: {
		preColor: "rose",
		color: "blue",
		icon: (props) => <TopicsIcon {...props} />,
	},
	default: {
		preColor: "gray",
		color: "gray",
		icon: (props) => <TermsIcon {...props} />,
	},
};

function TreeNode({ node }) {
	const {
		icon: Icon,
		color,
		preColor,
	} = nodeAttrs[node.hierarchy ?? "default"];
	const [isOpen, setIsOpen] = useState(false);
	const [isParentHovered, setIsParentHovered] = useState(false);
	const [isChildHovered, setIsChildHovered] = useState(false);

	const toggleOpen = () => setIsOpen((prev) => !prev);
	const toggleParentHover = () => setIsParentHovered((prev) => !prev);
	const toggleChildHover = () => setIsChildHovered((prev) => !prev);

	return (
		<>
			<div
				className="w-full"
				onMouseEnter={toggleParentHover}
				onMouseLeave={toggleParentHover}
			>
				<div
					className="flex items-center space-x-2 cursor-pointer text-slate-700 hover:text-slate-900 transition duration-300 p-2 relative z-30"
					onMouseEnter={toggleChildHover}
					onMouseLeave={toggleChildHover}
					onClick={toggleOpen}
				>
					<span
						className="flex-shrink-0 relative z-20 rounded-full overflow-hidden transition duration-300"
					>
						<Icon
							className={classNames(
								"w-6 h-6 p-1.5 transition duration-300",
								`bg-${preColor}-100`,
								node.children?.length
									? isChildHovered
										? "hidden"
										: "block"
									: "block"
							)}
						/>
						<ChevronRightIcon
							className={classNames(
								"h-6 w-6",
								`bg-${preColor}-100`,
								`fill-${preColor}-400`,
								isOpen
									? "rotate-90 duration-200"
									: "duration-100",
								node.children?.length
									? isChildHovered
										? "block"
										: "hidden"
									: "hidden"
							)}
						/>
					</span>
					{color !== preColor ? (
						<span
							className={classNames(
								`absolute h-0.5 w-4 top-1/2 -left-[19px] translate-x-1/2 z-0 transition duration-300`, isParentHovered
								? `bg-${color}-400`
								: `bg-${color}-200`
							)}
						/>
					) : null}
					<Link
						href="#"
						className={`text-xs leading-4 font-medium whitespace-nowrap ${node.children?.length >= 1 ? "font-bold" : ""}`}
					>
						{node.title}
					</Link>
				</div>
				{node.children?.length ? (
					<Transition
						show={isOpen}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<div className="pl-6 relative">
							<span
								className={classNames(
									"absolute left-4 -top-4 bottom-[18px] z-10 translate-x-[3px] w-0.5 transition duration-300",
									isParentHovered
										? `bg-${preColor}-400`
										: `bg-${preColor}-200`
								)}
							/>
							{node.children?.map((n) => (
								<TreeNode key={n._id} node={n} />
							))}
						</div>
					</Transition>
				) : null}
			</div>
		</>
	);
}

export default TreeNode;
