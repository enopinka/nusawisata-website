"use client";
// src/Tiptap.tsx
import {
    useEditor,
    EditorContent,
    FloatingMenu,
    BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";

interface TiptapProps {
    content: string;
    onChange: (value: string) => void;
}

export default function Tiptap({ content, onChange }: TiptapProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-4",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-4",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: content,

        editorProps: {
            attributes: {
                class: "min-h-[156px] border bg-slate-50 p-4",
            },
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });
    return (
        <>
            {editor && <MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </>
    );
}
