import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { useEditor } from "@tiptap/react";
import { useRef } from "react";

const MyComponent = () => {
  const editorRef = useRef();
  const editor = useEditor({
    extensions: [
      BubbleMenu.configure({
        key: "myFirstBubbleMenu",
        shouldShow: ({ editor }) => {
          // custom logic to show or hide the bubble menu
        },
      }),
      BubbleMenu.configure({
        key: "mySecondBubbleMenu",
        shouldShow: ({ editor }) => {
          // custom logic to show or hide the bubble menu
        },
      }),
      // other extensions
    ],
    // other options
  });

  return (
    <div>
      {/* first bubble menu */}

      <div className="my-first-bubble-menu">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
      </div>

      {/* second bubble menu */}

      <div className="my-second-bubble-menu">
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
      </div>

      {/* editor content */}
      <div className="editor" ref={editorRef} />
    </div>
  );
};
export default MyComponent;
