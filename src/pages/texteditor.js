import BlockQuote from "@/svgs/BlockQuote";
import Bold from "@/svgs/Bold";
import BulletList from "@/svgs/BulletList";
import CodeBlock from "@/svgs/CodeBlock";
import InlineCode from "@/svgs/InlineCode";
import Italic from "@/svgs/Italic";
import Links from "@/svgs/Links";
import OrderedList from "@/svgs/OrderedList";
import Strike from "@/svgs/Strike";
import Tasks from "@/svgs/Tasks";
import { Link as LinkExtension } from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EditorText = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: null,
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content: `
      <h2>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </h2>
      <h3>
        Neat, isn&apos;t it? Add an empty paragraph to see the floating menu.
      </h3>
    `,
  });

  const toggleLinkHref = () => {
    console.log(editor.getAttributes("link"));
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

  // const setLink = useCallback(() => {
  //   const previousUrl = editor.getAttributes("link").href;
  //   const url = window.prompt("URL", previousUrl);

  //   // cancelled
  //   if (url === null) {
  //     return;
  //   }

  //   // empty
  //   if (url === "") {
  //     editor.chain().focus().extendMarkRange("link").unsetLink().run();

  //     return;
  //   }

  //   // update link
  //   editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  // }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex border bg-gradient-to-t from-neutral-50 to-neutral-200 dark:bg-neutral-800 text-slate-500 dark:text-slate-100 p-1 rounded-md divide-x-2 absolute top-16"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <div className="flex space-x-2 px-1 py-0.5">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 48 48"
                fill="currentColor"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8V40"
                  stroke="#000000"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25 8V40"
                  stroke="#000000"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 24H25"
                  stroke="#000000"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34.2261 24L39.0001 19.0166V40"
                  stroke="#000000"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H<small>2</small>
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={
                editor.isActive("heading", { level: 4 }) ? "is-active" : ""
              }
            >
              H3
            </button>
          </div>
          <div className="flex space-x-2 px-1 py-0.5">
            <button
              title="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("bold") ? "is-active" : ""
              )}
            >
              <Bold />
            </button>

            <button
              title="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("italic") ? "is-active" : ""
              )}
            >
              <Italic />
            </button>

            <button
              title="Strike-through"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("strike") ? "is-active" : ""
              )}
            >
              <Strike />
            </button>

            <button
              title="Link"
              onClick={toggleLinkHref}
              disabled={
                !editor
                  .can()
                  .chain()
                  .focus()
                  .toggleLink({ href: "https://www.google.com" })
                  .run()
              }
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("link") ? "is-active" : ""
              )}
            >
              <Links />
            </button>
          </div>

          <div className="flex space-x-2 px-1 py-0.5">
            <button
              title="Bullet List"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={classNames(
                "text-sm font-medium p-2 hover:text-slate-800",
                editor.isActive("bulletList") ? "is-active" : ""
              )}
            >
              <BulletList />
            </button>

            <button
              title="Ordered List"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("orderedList") ? "is-active" : ""
              )}
            >
              <OrderedList />
            </button>

            <button
              title="Task List"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={classNames(
                "p-2 hover:text-slate-800",
                editor.isActive("taskList") ? "is-active" : ""
              )}
            >
              <Tasks />
            </button>
          </div>
          <div className="flex space-x-2 px-1 py-0.5">
            <button
              title="Code Block"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("codeBlock") ? "is-active" : ""
              )}
            >
              <CodeBlock />
            </button>

            <button
              title="Block Quote"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("blockquote") ? "is-active" : ""
              )}
            >
              <BlockQuote />
            </button>

            <button
              title="Inline Code"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={classNames(
                "text-sm font-medium px-1 p-2 hover:text-slate-800",
                editor.isActive("code") ? "is-active" : ""
              )}
            >
              <InlineCode />
            </button>
          </div>
        </BubbleMenu>
      )}

      <div className="w-1/2 relative">
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
