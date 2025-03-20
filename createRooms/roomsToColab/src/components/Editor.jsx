// import React, { useEffect } from 'react'
// import Codemirror from 'codemirror'
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/theme/javascript/javascript';

// const Editor = () => {

//     useEffect(() => {
//         async function init(){
//             Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
//                 mode: {name: 'javascript', json: true},
//                 theme: 'dracula',
//                 autoCloseTags: true,
//                 lineNumbers: true,
//                 lineWrapping: true,
//                 indentUnit: 4,
//                 indentWithTabs: false,
//             })
//         }
//         init();
//     },[])

//   return (
//     <textarea id='realtimeEditor'></textarea>
//   )
// }

// export default Editor










// import React, { useEffect, useRef } from "react";
// import { EditorView, basicSetup } from "@codemirror/basic-setup";
// import { javascript } from "@codemirror/lang-javascript";
// import { dracula } from "@uiw/codemirror-theme-dracula";

// const Editor = () => {
//     const editorRef = useRef(null);
//     const viewRef = useRef(null); // To keep track of the editor instance

//     useEffect(() => {
//         if (editorRef.current && !viewRef.current) {
//             viewRef.current = new EditorView({
//                 doc: "// Write your JavaScript code here...",
//                 extensions: [basicSetup, javascript(), dracula],
//                 parent: editorRef.current,
//             });
//         }

//         return () => {
//             if (viewRef.current) {
//                 viewRef.current.destroy();
//                 viewRef.current = null;
//             }
//         };
//     }, []);

//     return <div ref={editorRef} style={{ border: "1px solid #ccc", minHeight: "300px" }} className="w-full h-screen p-5" />;
// };

// export default Editor;


import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { autocompletion } from "@codemirror/autocomplete";
import { closeBrackets } from "@codemirror/autocomplete";
import { html } from "@codemirror/lang-html";

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
            <div className="fixed w-full bg-gray-900 shadow-md h-16 py-2 px-6 flex items-center justify-between">
                <p className="text-gray-400 p-7 text-2xl font-semibold">Editor Workspace</p>
            </div>

            {/* Editor container with padding-top to prevent overlap */}
            <div ref={editorRef} className="flex overflow-y-auto overflow-x-auto scrollbar-hide w-full h-full bg-[#282a36] text-white p-4 pt-18">
            </div>
        </div>
    );
};

export default Editor;

