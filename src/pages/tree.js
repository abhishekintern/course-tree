import { TreeView } from "@/components/organisms";
import tree from "@/utils/getTree";

const Tree = () => {
	return (
		<>
			<div className="h-screen grid grid-cols-12">
				<div className="flex flex-col p-8 pr-3 pb-3 rounded-md bg-white col-span-3 space-y-4 overflow-scroll scrollbar">
					<div className="text-sm leading-5 font-semibold tracking-wider uppercase text-gray-500">
						Curriculum
					</div>
					<div className="w-full flex flex-col mr-4 space-y-1 select-none">
						<TreeView tree={tree} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Tree;
