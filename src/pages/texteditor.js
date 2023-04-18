import { Link as LinkExtension } from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import {
  BubbleMenu,
  EditorContent,
  useEditor,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BlockQuote,
  Bold,
  BulletList,
  CodeBlock,
  Heading,
  InlineCode,
  Italic,
  Links,
  OrderedList,
  Paragraph,
  Strike,
  SubHeading,
  Tasks,
} from "@/svgs/IconSvg";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EditorText = () => {
  const [contentPara, setContentPara] = useState("<p>Hola</p>");
  const toggleLinkHref = () => {
    // console.log(editor.getAttributes("link"));
    if (editor.getAttributes("link").href) {
      return editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      let href = prompt("Please Enter a valid URL to create a link");
      if (href)
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: href })
          .run();
      href = null;
      return;
    }
  };

  const featuresList = [
    {
      title: "Heading",
      function: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: "heading",
      component: Heading,
    },
    {
      title: "Sub-Heading",
      function: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: "heading",
      component: SubHeading,
    },
    {
      title: "Paragraph",
      function: () => editor.chain().focus().setParagraph().run(),
      isActive: "paragraph",
      component: Paragraph,
    },
    {
      title: "Bold",
      function: () => editor.chain().focus().toggleBold().run(),
      isActive: "bold",
      component: Bold,
    },
    {
      title: "Italic",
      function: () => editor.chain().focus().toggleItalic().run(),
      isActive: "italic",
      component: Italic,
    },
    {
      title: "Strile-through",
      function: () => editor.chain().focus().toggleStrike().run(),
      isActive: "strike",
      component: Strike,
    },
    {
      title: "Link",
      function: () => editor.chain().focus().toggleLink().run(),
      isActive: "link",
      component: Links,
      onClick: toggleLinkHref,
    },
    {
      title: "Bullet List",
      function: () => editor.chain().focus().toggleBulletList().run(),
      isActive: "bulletList",
      component: BulletList,
    },
    {
      title: "Ordered List",
      function: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: "orderedList",
      component: OrderedList,
    },
    {
      title: "Task List",
      function: () => editor.chain().focus().toggleTaskList().run(),
      isActive: "taskList",
      component: Tasks,
    },
    {
      title: "Code Block",
      function: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: "codeBlock",
      component: CodeBlock,
    },
    {
      title: "Blockquote",
      function: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: "blockquote",
      component: BlockQuote,
    },
    {
      title: "Inline Code",
      function: () => editor.chain().focus().toggleCode().run(),
      isActive: "code",
      component: InlineCode,
    },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      LinkExtension.configure({
        validate: (href) => /^https?:\/\//.test(href),
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none items-center",
      },
    },
    content: `${contentPara}`,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      // setContentPara(html);
      // send the content to an API here
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex border bg-gradient-to-t from-neutral-50 to-neutral-200 dark:bg-neutral-800 text-slate-500 dark:text-slate-100 p-1 rounded-md divide-x-2 absolute"
          tippyOptions={{
            duration: 100,
            placement: "bottom",
            offset: [-500, 0],
          }}
          editor={editor}
        >
          <div className="flex space-x-2 px-1 py-0.5">
            {featuresList.map((feature, i) => (
              <button
                key={i}
                title={feature.title}
                onClick={feature.onClick ? feature.onClick : feature.function}
                className={classNames(
                  "text-sm font-medium px-1 p-2 hover:text-slate-800 active:text-slate-800"
                )}
              >
                <feature.component />
              </button>
            ))}
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu
          className="flex border bg-gradient-to-t from-neutral-50 to-neutral-200 dark:bg-neutral-800 text-slate-500 dark:text-slate-100 p-1 rounded-md divide-x-2 absolute"
          tippyOptions={{
            duration: 100,
            placement: "bottom",
            offset: [-500, 0],
          }}
          editor={editor}
        >
          <div className="flex space-x-2 px-1 py-0.5">
            {featuresList.map((feature, i) => (
              <button
                key={i}
                title={feature.title}
                onClick={feature.onClick ? feature.onClick : feature.function}
                className={classNames(
                  "text-sm font-medium px-1 p-2 hover:text-slate-800 active:text-slate-800"
                )}
              >
                <feature.component />
              </button>
            ))}
          </div>
        </FloatingMenu>
      )}

      <div className="relative bg-slate-100 border">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

const Main = () => {
  return (
    <div className="bg-gray-200 border-2 flex items-center justify-center">
      <EditorText />
    </div>
  );
};

export default Main;
