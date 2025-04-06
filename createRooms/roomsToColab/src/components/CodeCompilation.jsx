import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { languageMap } from '../utils/languageConfigs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const CodeCompilation = ({ code, language }) => {
    const [output, setOutput] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setOutput("");
    }, [language]);

    const handleRun = async () => {
        setProcessing(true);
        setOutput("Running...");

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
                    stdin: ""
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        // "X-RapidAPI-Key": import.meta.env.RAPIDAPI_KEY, // 0298->key
                        // "X-RapidAPI-Key": "251cc5d984msh17be207996d1ea7p11e828jsn0245c9946560", // 2767->key
                        "X-RapidAPI-Key": "52115d8221msh9a9e3327b334d21p143a93jsn0f1dc68e6b2a", // 0298->key
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
        <div className="flex justify-between items-center mb-2">
            {/* Input/Output Tabs */}
            <div className="flex space-x-4 mx-2 text-gray-500 font-semibold items-center">
                <button className="active:text-gray-400 cursor-pointer transition-colors duration-200">
                    Input
                </button>
                <div className="w-0.5 h-5 bg-stone-500" />
                <button className="active:text-gray-400 cursor-pointer transition-colors duration-200">
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
            {/* {!processing && <FontAwesomeIcon icon={faPlay} />} */}
            {processing ? 'Running... ' : 'Run Code'}
            </button>
        </div>

        {/* Output Box */}
        <pre
            className={`flex-1 p-2 rounded border border-gray-700 shadow-inner overflow-y-auto whitespace-pre-wrap text-md ${
            output.includes('Rate limit exceeded')
                ? 'bg-yellow-900 text-yellow-200'
                : 'bg-black text-green-400'
            }`}
        >
            {output}
        </pre>
        </div>
    );
};

export default CodeCompilation;