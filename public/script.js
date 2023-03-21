import data from "./data";

let tree;
const groupHierarchy = (parent, children, key) => {
  return parent.map((p) => {
    p.children = [];
    children.forEach((chapter) => {
      if (chapter[key] === p._id) {
        delete chapter.termId;
        p.children.push(chapter);
      }
    });
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
if (hasSubjects) tree = groupHierarchy(terms, subjects, "termId");

export default tree;
