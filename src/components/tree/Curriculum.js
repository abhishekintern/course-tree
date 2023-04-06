import Link from "next/link";
import { useEffect, useState } from "react";
import Subject from "./Subject";
import ToggleArrow from "./ToggleArrow";

const data = {
  terms: [
    {
      _id: "6321a1a0a7d17ae3489e5ae6",
      termId: "6321a1a0a7d17ae3489e5ae6",
      title: "Term for BTECH",
      uid: "BTECH2022CSET1",
    },
    {
      _id: "6321a8b4365864a80c5b0690",
      termId: "6321a8b4365864a80c5b0690",
      title: "Term for BTECH",
      uid: "BTECH2022CSET2",
    },
    {
      _id: "6321a8be365864a80c5b0694",
      termId: "6321a8be365864a80c5b0694",
      title: "Term for BTECH",
      uid: "BTECH2022CSET3",
    },
    {
      _id: "6321a8c6365864a80c5b0698",
      termId: "6321a8c6365864a80c5b0698",
      title: "Term for BTECH",
      uid: "BTECH2022CSET4",
    },
  ],
  subjects: [
    {
      _id: "6321be78f976e23f9cfbd31e",
      termId: "6321a1a0a7d17ae3489e5ae6",
      title: "Subject for T1 of  BTECH",
      uid: "BTECH2022CSET1S1",
    },
    {
      _id: "6321be81f976e23f9cfbd322",
      termId: "6321a1a0a7d17ae3489e5ae6",
      title: "Subject for T1 of  BTECH",
      uid: "BTECH2022CSET1S2",
    },
    {
      _id: "6321becdf976e23f9cfbd33a",
      termId: "6321a1a0a7d17ae3489e5ae6",
      title: "Subject for T1 of  BTECH",
      uid: "BTECH2022CSET2S4",
    },
    {
      _id: "6321bf4ff976e23f9cfbd39a",
      termId: "6321a1a0a7d17ae3489e5ae6",
      title: "Subject for T1 of  BTECH",
      uid: "BTECH2022CSET8S4",
    },
  ],
  chapters: [
    {
      _id: "632321e3b7644f3f532e0ac1",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP12",
    },
    {
      _id: "6323260af6745342501fdd37",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP123",
    },
    {
      _id: "63232656f6745342501fdd3b",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP1234",
    },
    {
      _id: "6323265df6745342501fdd3f",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP1235",
    },
    {
      _id: "63232661f6745342501fdd43",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP12356",
    },
    {
      _id: "63232667f6745342501fdd47",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP12357",
    },
    {
      _id: "63232675f6745342501fdd4b",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      title: "This is a test chapter",
      uid: "CHAP12358",
    },
    {
      _id: "6332a9314fd04cbc3106365a",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321be78f976e23f9cfbd31e",
      title: "This is a test chapter",
      uid: "CHAP123581",
    },
  ],
  topics: [
    {
      _id: "63281433781cf2bfc637661d",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      chapterId: "632321e3b7644f3f532e0ac1",
      title: "This is a test title.",
    },
    {
      _id: "63281443781cf2bfc6376621",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      chapterId: "632321e3b7644f3f532e0ac1",
      title: "This is a test title 2.",
    },
    {
      _id: "63281448781cf2bfc6376625",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      chapterId: "632321e3b7644f3f532e0ac1",
      title: "This is a test title 3.",
    },
    {
      _id: "6328144c781cf2bfc6376629",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      chapterId: "632321e3b7644f3f532e0ac1",
      title: "This is a test title 4.",
    },
    {
      _id: "63281450781cf2bfc637662d",
      termId: "6321a1a0a7d17ae3489e5ae6",
      subjectId: "6321bf4ff976e23f9cfbd39a",
      chapterId: "632321e3b7644f3f532e0ac1",
      title: "This is a test title 5.",
    },
  ],
};
const Curriculum = () => {
  // let tree = [];
  const [tree, setTree] = useState([]);
  const [toggleArrow, setToggleArrow] = useState(false);

  useEffect(() => {
    const data = {
      terms: [
        {
          _id: "6321a1a0a7d17ae3489e5ae6",
          termId: "6321a1a0a7d17ae3489e5ae6",
          title: "Term for BTECH",
          uid: "BTECH2022CSET1",
        },
        {
          _id: "6321a8b4365864a80c5b0690",
          termId: "6321a8b4365864a80c5b0690",
          title: "Term for BTECH",
          uid: "BTECH2022CSET2",
        },
        {
          _id: "6321a8be365864a80c5b0694",
          termId: "6321a8be365864a80c5b0694",
          title: "Term for BTECH",
          uid: "BTECH2022CSET3",
        },
        {
          _id: "6321a8c6365864a80c5b0698",
          termId: "6321a8c6365864a80c5b0698",
          title: "Term for BTECH",
          uid: "BTECH2022CSET4",
        },
      ],
      subjects: [
        {
          _id: "6321be78f976e23f9cfbd31e",
          termId: "6321a1a0a7d17ae3489e5ae6",
          title: "Subject for T1 of  BTECH",
          uid: "BTECH2022CSET1S1",
        },
        {
          _id: "6321be81f976e23f9cfbd322",
          termId: "6321a1a0a7d17ae3489e5ae6",
          title: "Subject for T1 of  BTECH",
          uid: "BTECH2022CSET1S2",
        },
        {
          _id: "6321becdf976e23f9cfbd33a",
          termId: "6321a1a0a7d17ae3489e5ae6",
          title: "Subject for T1 of  BTECH",
          uid: "BTECH2022CSET2S4",
        },
        {
          _id: "6321bf4ff976e23f9cfbd39a",
          termId: "6321a1a0a7d17ae3489e5ae6",
          title: "Subject for T1 of  BTECH",
          uid: "BTECH2022CSET8S4",
        },
      ],
      chapters: [
        {
          _id: "632321e3b7644f3f532e0ac1",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP12",
        },
        {
          _id: "6323260af6745342501fdd37",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP123",
        },
        {
          _id: "63232656f6745342501fdd3b",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP1234",
        },
        {
          _id: "6323265df6745342501fdd3f",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP1235",
        },
        {
          _id: "63232661f6745342501fdd43",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP12356",
        },
        {
          _id: "63232667f6745342501fdd47",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP12357",
        },
        {
          _id: "63232675f6745342501fdd4b",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          title: "This is a test chapter",
          uid: "CHAP12358",
        },
        {
          _id: "6332a9314fd04cbc3106365a",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321be78f976e23f9cfbd31e",
          title: "This is a test chapter",
          uid: "CHAP123581",
        },
      ],
      topics: [
        {
          _id: "63281433781cf2bfc637661d",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          chapterId: "632321e3b7644f3f532e0ac1",
          title: "This is a test title.",
        },
        {
          _id: "63281443781cf2bfc6376621",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          chapterId: "632321e3b7644f3f532e0ac1",
          title: "This is a test title 2.",
        },
        {
          _id: "63281448781cf2bfc6376625",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          chapterId: "632321e3b7644f3f532e0ac1",
          title: "This is a test title 3.",
        },
        {
          _id: "6328144c781cf2bfc6376629",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          chapterId: "632321e3b7644f3f532e0ac1",
          title: "This is a test title 4.",
        },
        {
          _id: "63281450781cf2bfc637662d",
          termId: "6321a1a0a7d17ae3489e5ae6",
          subjectId: "6321bf4ff976e23f9cfbd39a",
          chapterId: "632321e3b7644f3f532e0ac1",
          title: "This is a test title 5.",
        },
      ],
    };
    const groupHierarchy = (parent, children, key) => {
      return parent.map((p, index) => {
        p.children = [];
        children.forEach((chapter) => {
          if (chapter[key] === p._id) {
            delete chapter.termId;
            p.children.push(chapter);
          }
        });
        // console.log(p, index);
        return p;
      });
    };

    const hasSubjects = Boolean(data.subjects.length);
    const hasChapters = Boolean(data.chapters.length);
    const hasTopics = Boolean(data.topics.length);
    let terms = data.terms;
    let subjects = data.subjects;
    let chapters = data.chapters;
    let topics = data.topics;
    delete data.terms;
    delete data.subjects;
    delete data.chapters;
    delete data.topics;

    if (hasTopics) chapters = groupHierarchy(chapters, topics, "chapterId");
    if (hasChapters) subjects = groupHierarchy(subjects, chapters, "subjectId");
    if (hasSubjects) setTree(groupHierarchy(terms, subjects, "termId"));

    // console.log("Chapters ",chapters);
    // console.log("Subjects ",subjects);
    recursion(groupHierarchy(terms, subjects, "termId"));
    // eslint-disable-next-line
  }, []);

  const recursion = (tree) => {
    tree.map((children, index, array) => {
      console.log(index, children);
      return recursion(children.children);
    });
  };

  // console.log("Tree ", tree);
  return (
    <div className="bg-white w-[300px] min-w-[300px] h-screen overflow-y-scroll pb-8 p-2 text-black text-xs scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <h1 className="text-sm font-semibold text-gray-500 mb-3 ml-2">
        CURRICULUM
      </h1>
      {/* TERMS MAP FUNCTION */}
      <h2 className="font-semibold text-sm ml-2 mb-2">
        Bachelors of Technology
      </h2>
      <div className="relative">
        <span className="inset-x-[22px] -inset-y-2.5 absolute w-[2px] h-full bg-pink-300"></span>
        {tree.map((term) => {
          // console.log(term);
          return (
            <div key={term._id} className="pl-2 h-fit">
              <div
                onClick={() => setToggleArrow(!toggleArrow)}
                className="py-1 flex justify-between items-center relative h-full hover:text-gray-700 rounded transition-all cursor-pointer"
              >
                <div className="flex items-center h-full">
                  {/* <span className="inset-x-3.5 -inset-y-2 absolute w-[2px] h-[12px] z-0 bg-pink-400"></span> */}
                  {/* TERM SVG PHOTO-------------------------- */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#F472B6"
                    className="w-8 h-8 p-1.5 bg-pink-100 rounded-full z-10"
                  >
                    <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
                  </svg>
                  <Link href={"/"} className="mx-4 font-semibold text-xs">
                    {term.title}
                  </Link>
                  {/* <span className="inset-x-3.5 inset-y-9 absolute w-[2px] h-[12px] z-0 bg-pink-400"></span> */}
                  {/* {term.children.length >= 1 && (
                  <span className="inset-x-3.5 z-50 absolute w-[2px] h-full bg-yellow-400"></span>
                )} */}
                </div>
                {/* ARROW ICON SVG -------------------------- */}
                {term.children.length >= 1 && (
                  <ToggleArrow {...{ toggleArrow, setToggleArrow }} />
                )}
              </div>
              {toggleArrow && term.children.length >= 1 && (
                <div className="pl-3.5 my-2 font-medium relative">
                  {/* SUBJECTS MAP FUNCTION */}
                  <span className="-inset-y-[15px] inset-x-3.5 absolute h-full w-[2px] bg-pink-300"></span>

                  {term.children.map((subject) => {
                    // console.log(subject);
                    return <Subject key={subject._id} {...{ subject }} />;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;
