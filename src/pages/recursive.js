import TreeNode from "@/functions/TreeNode";
import tree from "../../public/script";

function Tree() {
  return (
    <div className="bg-white w-[250px] overflow-x-scroll min-w-[250px] h-screen overflow-y-scroll pb-8 p-2 text-black text-xs scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <h1 className="text-sm font-semibold text-gray-500 mb-3 ml-2">
        CURRICULUM
      </h1>
      {/* TERMS MAP FUNCTION */}
      <h2 className="font-semibold text-sm ml-2 mb-2">
        Bachelors of Technology
      </h2>
      <div className="relative">
        {/* <span className="inset-x-[22px] -inset-y-2.5 absolute w-[2px] h-full bg-pink-300"></span> */}
        <span className="inset-x-6 -inset-y-2.5 absolute w-0.5 h-full bg-pink-300"></span>
        <div className="space-y-2">
          {tree?.map((node) => (
            <TreeNode key={node._id} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tree;
