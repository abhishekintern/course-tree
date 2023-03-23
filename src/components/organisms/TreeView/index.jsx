import { TreeNode } from "@/components/atoms";

const TreeView = ({ tree }) => {
	return (
		<>
			{tree?.map((node) => (
				<TreeNode key={node._id} node={node} />
			))}
		</>
	);
};

export default TreeView;
