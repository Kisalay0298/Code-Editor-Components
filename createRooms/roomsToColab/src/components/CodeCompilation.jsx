import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { languageMap } from '../utils/languageConfigs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard, faTerminal } from '@fortawesome/free-solid-svg-icons';

const CodeCompilation = ({ code, language }) => {
    const [output, setOutput] = useState("");
    const [processing, setProcessing] = useState(false);
    const [input, setInput] = useState(""); // 🆕 Added input state
    const [showInput, setShowInput] = useState(false); // 🆕 Input toggle

    useEffect(() => {
        setOutput("");
    }, [language]);

    const handleRun = async () => {
        setProcessing(true);
        setOutput("Running...");
        setShowInput(false); // 🆕 Auto-switch to output tab

        try {
            let sourceCode = code;
            if (language === "Java" && !code.includes("class Main")) {
                sourceCode = `
public class Main {
    public static void main(String[] args) {
        ${code}
    }
}`;
            }

            const response = await axios.post(
                "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
                {
                    source_code: sourceCode,
                    language_id: languageMap[language],
                    stdin: input // 🆕 Pass the input here
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-RapidAPI-Key": "251cc5d984msh17be207996d1ea7p11e828jsn0245c9946560", // 2767->key
                        // "X-RapidAPI-Key": "52115d8221msh9a9e3327b334d21p143a93jsn0f1dc68e6b2a", // 0298->key
                        // "X-RapidAPI-Key": "39ecde65camsh7472457368c8cdap18bd00jsnf314c9c1f7c2", // kislayhbe->key
                        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
                    }
                }
            );

            const result = response.data;

            if (result.stderr) {
                setOutput(`Error: ${result.stderr}`);
            } else if (result.compile_output) {
                setOutput(`Compilation Error: ${result.compile_output}`);
            } else {
                setOutput(result.stdout || "No output");
            }
        } catch (error) {
            console.error("Error running code:", error);
            if (error.response?.status === 429) {
                setOutput(`
Rate limit exceeded! 
This is a free API with limited requests. Please try:
1. Wait a few minutes before trying again
2. Sign up for your own API key at RapidAPI
3. Use a different API key with higher limits if you have the source code`);
            } else {
                setOutput(`Error: ${error.message || "Failed to run code"}`);
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-1">
                {/* Tabs to switch between Input and Output */}
                <div className="flex space-x-2 mx-2 text-sm font-medium">
                    <button
                        onClick={() => setShowInput(true)}
                        className={`px-2 py-1 rounded-md transition-colors duration-200 cursor-pointer ${
                            showInput
                                ? "bg-gray-600 text-white font-semibold"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                    >
                        <FontAwesomeIcon icon={faKeyboard} className='mr-1' />
                        Input
                    </button>
                    <button
                        onClick={() => setShowInput(false)}
                        className={`px-2 py-1 rounded-md transition-colors duration-200 cursor-pointer ${
                            !showInput
                                ? "bg-gray-600 text-white font-semibold"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                    >
                        <FontAwesomeIcon icon={faTerminal} className='mr-1' />
                        Output
                    </button>
                </div>

                {/* Run Button */}
                <button
                    onClick={handleRun}
                    disabled={processing}
                    className={`flex items-center gap-2 text-white mx-2 px-4 py-1 rounded transition-colors duration-300 mb-1 shadow-sm cursor-pointer ${
                        processing
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    <FontAwesomeIcon icon={processing ? faPause : faPlay} />
                    {processing ? 'Running... ' : 'Run Code'}
                </button>
            </div>

            {/* Shared Panel for Input or Output */}
            <div className="flex-1 rounded border border-gray-700 shadow-inner overflow-y-auto whitespace-pre-wrap text-md bg-black">
                {showInput ? (
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter input (stdin)..."
                        className="w-full h-full p-2 bg-black text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <pre
                        className={`h-full p-2 ${
                            output.includes('Rate limit exceeded')
                                ? 'text-yellow-200'
                                : 'text-green-400'
                        }`}
                    >
                        {output}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default CodeCompilation;
