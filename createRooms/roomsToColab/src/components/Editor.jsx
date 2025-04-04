import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { autocompletion } from "@codemirror/autocomplete";
import { closeBrackets } from "@codemirror/autocomplete";
import { html } from "@codemirror/lang-html";
import NavBar from "./NavBar";

const Editor = () => {
    const editorRef = useRef(null);
    const viewRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) {
            console.error("❌ Error: Editor container not found.");
            return;
        }

        if (!viewRef.current) {
            viewRef.current = new EditorView({
                parent: editorRef.current,
                state: EditorState.create({
                    doc: "// Write your JavaScript code here...",
                    extensions: [
                        basicSetup,       // Includes line numbers, auto-closing brackets
                        javascript({ jsx: true }), // JavaScript mode with JSX support
                        dracula,          // Dracula theme
                        autocompletion(), // Enables auto-completion
                        closeBrackets(),  // Auto-close brackets
                        html(),           // HTML auto-closing tags
                        EditorView.updateListener.of((update) => {
                            if (update.docChanged) {
                                console.log("✍️ Editor content changed:", update.state.doc.toString());
                            }
                        }),
                        EditorView.editable.of(true) // Enable editing
                    ]
                })
            });
        }

        return () => {
            if (viewRef.current) {
                console.log("🧹 Cleaning up CodeMirror instance...");
                viewRef.current.destroy();
                viewRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex flex-col w-full h-screen overflow-y-hidden">
            {/* Fixed Navbar */}
            <NavBar />

            {/* Editor container with padding-top to prevent overlap */}
            <div ref={editorRef} className="flex overflow-y-auto overflow-x-auto overflow-hidden scrollbar-hide h-full bg-[#282a36] text-white p-4 pt-18">
            </div>
        </div>
    );
};

export default Editor;

