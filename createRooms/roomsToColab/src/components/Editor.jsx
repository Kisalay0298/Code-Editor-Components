import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import NavBar from "./NavBar";
import { languageConfigs } from "../utils/languageConfigs";
import CodeCompilation from "./CodeCompilation";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:6948"); // Replace with actual backend

const Editor = () => {
    const editorRef = useRef(null);
    const viewRef = useRef(null);
    const isDragging = useRef(false);
    const [currentLanguage, setCurrentLanguage] = useState("JavaScript");
    const [code, setCode] = useState(languageConfigs["JavaScript"].defaultCode);
    const [compilationHeight, setCompilationHeight] = useState(200);
    const { roomId } = useParams();

    // Handle editor setup
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
                        const updatedCode = update.state.doc.toString();
                        setCode(updatedCode);
                        socket.emit("codeChange", { roomId, code: updatedCode });
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
    }, [roomId, currentLanguage]);

    // Listen to incoming code updates from other users
    useEffect(() => {
        const handleCodeUpdate = (incomingCode) => {
            if (viewRef.current && incomingCode !== code) {
                const newState = EditorState.create({
                    doc: incomingCode,
                    extensions: [
                        basicSetup,
                        languageConfigs[currentLanguage].mode,
                        dracula,
                        autocompletion(),
                        closeBrackets(),
                        EditorView.updateListener.of((update) => {
                            if (update.docChanged) {
                                const newCode = update.state.doc.toString();
                                setCode(newCode);
                                socket.emit("codeChange", { roomId, code: newCode });
                            }
                        }),
                        EditorView.editable.of(true)
                    ]
                });

                viewRef.current.setState(newState);
            }
        };

        socket.on("codeUpdate", handleCodeUpdate);

        return () => {
            socket.off("codeUpdate", handleCodeUpdate);
        };
    }, [roomId, currentLanguage, code]);

    // Handle language switch
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
                            const newCode = update.state.doc.toString();
                            setCode(newCode);
                            socket.emit("codeChange", { roomId, code: newCode });
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
        socket.emit("join", { roomId, userName: "YourUserName", userId: "YourUserId" });
    
        socket.on("codeUpdate", (newCode) => {
          setCode(newCode); // Update the code state with the new code
        });
    
        return () => {
          socket.disconnect();
        };
      }, [roomId]);
    
      // Function to handle code changes
    //   const handleCodeChange = (newCode) => {
    //     setCode(newCode);
    //     socket.emit("codeChange", { roomId, code: newCode }); // Emit the code change
    //   };

    // Drag to resize output panel
    const startDrag = () => (isDragging.current = true);
    const stopDrag = () => (isDragging.current = false);
    const onDrag = (e) => {
        if (isDragging.current) {
            const newHeight = window.innerHeight - e.clientY;
            setCompilationHeight(Math.max(100, newHeight));
        }
    };

    return (
        <div
            className="flex flex-col h-screen bg-[#282a36]"
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
        >
            <div className="bg-gray-900 p-4">
                <NavBar currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            </div>

            <div className="flex-1 overflow-hidden">
                <div ref={editorRef} className="w-full h-full" />
            </div>

            <div
                onMouseDown={startDrag}
                className="h-2 cursor-row-resize bg-gray-700 hover:bg-gray-600 transition"
            />

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
