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
    const [currentLanguage, setCurrentLanguage] = useState("JavaScript");
    const [code, setCode] = useState(languageConfigs["JavaScript"].defaultCode);

    const handleLanguageChange = (newLanguage) => {
        setCurrentLanguage(newLanguage);
        if (viewRef.current) {
            // Create new state with the default code for the selected language
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
            // Update the code state with the default code
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

    return (
        <div className="flex flex-col w-full h-screen bg-[#282a36]">
            <div className="bg-gray-900 p-4">
                <NavBar currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            </div>
            
            <div className="flex flex-1">
                <div 
                    ref={editorRef} 
                    className="w-full h-full overflow-auto"
                    style={{ height: 'calc(100vh - 120px)' }}
                />
            </div>
            <div className="p-4">
                <CodeCompilation 
                    code={code} 
                    language={currentLanguage}
                />
            </div>
        </div>
    );
};

export default Editor;