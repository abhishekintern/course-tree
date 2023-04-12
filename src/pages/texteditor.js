import "../styles/Editor.module.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EditorText = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: `
      <h1>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </h1>
      <p>
        Neat, isn&apos;t it? Add an empty paragraph to see the floating menu.
      </p>
    `,
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex bg-black p-1 rounded-lg text-white absolute"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("bold") ? "is-active" : ""
            )}
          >
            bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("italic") ? "is-active" : ""
            )}
          >
            italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("strike") ? "is-active" : ""
            )}
          >
            strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("code") ? "is-active" : ""
            )}
          >
            code
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            )}
          >
            h1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            )}
          >
            h2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            )}
          >
            h3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("bulletList") ? "is-active" : ""
            )}
          >
            bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("orderedList") ? "is-active" : ""
            )}
          >
            ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("codeBlock") ? "is-active" : ""
            )}
          >
            code block
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={classNames(
              "text-sm font-medium px-1",
              editor.isActive("blockquote") ? "is-active" : ""
            )}
          >
            blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            horizontal rule
          </button>
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
    <div className="bg-gray-100 border-2 flex items-center justify-center">
      <EditorText />
    </div>
  );
};

export default Main;
