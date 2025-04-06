import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import NavBar from "./NavBar";
import { languageConfigs } from "../utils/languageConfigs";
import CodeCompilation from "./CodeCompilation";

const Editor = () => {
    const editorRef = useRef(null);
    const viewRef = useRef(null);
    const isDragging = useRef(false);
    const [currentLanguage, setCurrentLanguage] = useState("JavaScript");
    const [code, setCode] = useState(languageConfigs["JavaScript"].defaultCode);
    const [compilationHeight, setCompilationHeight] = useState(200); // Initial height of the compilation panel

    const handleLanguageChange = (newLanguage) => {
        setCurrentLanguage(newLanguage);
        if (viewRef.current) {
            const newState = EditorState.create({
                doc: languageConfigs[newLanguage].defaultCode,
                extensions: [
                    basicSetup,
                    languageConfigs[newLanguage].mode,
                    dracula,
                    autocompletion(),
                    closeBrackets(),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            setCode(update.state.doc.toString());
                        }
                    }),
                    EditorView.editable.of(true)
                ]
            });
            viewRef.current.setState(newState);
            setCode(languageConfigs[newLanguage].defaultCode);
        }
    };

    useEffect(() => {
        if (!editorRef.current) return;

        const state = EditorState.create({
            doc: languageConfigs[currentLanguage].defaultCode,
            extensions: [
                basicSetup,
                languageConfigs[currentLanguage].mode,
                dracula,
                autocompletion(),
                closeBrackets(),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        setCode(update.state.doc.toString());
                    }
                }),
                EditorView.editable.of(true)
            ]
        });

        const view = new EditorView({
            state,
            parent: editorRef.current
        });

        viewRef.current = view;

        return () => {
            view.destroy();
        };
    }, [currentLanguage]);

    // Handle drag resize
    const startDrag = () => (isDragging.current = true);
    const stopDrag = () => (isDragging.current = false);
    const onDrag = (e) => {
        if (isDragging.current) {
            const newHeight = window.innerHeight - e.clientY;
            setCompilationHeight(Math.max(100, newHeight)); // Minimum height = 100px
        }
    };

    return (
        <div
            className="flex flex-col h-screen bg-[#282a36]"
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
        >
            {/* NavBar */}
            <div className="bg-gray-900 p-4">
                <NavBar currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden">
                <div ref={editorRef} className="w-full h-full" />
            </div>

            {/* Drag Handle */}
            <div
                onMouseDown={startDrag}
                className="h-2 cursor-row-resize bg-gray-700 hover:bg-gray-600 transition"
            />

            {/* Code Compilation (Resizable) */}
            <div
                className="bg-gray-800 p-2 overflow-auto"
                style={{ height: `${compilationHeight}px` }}
            >
                <CodeCompilation code={code} language={currentLanguage} />
            </div>
        </div>
    );
};

export default Editor;
