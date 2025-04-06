import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { languageMap } from '../utils/languageConfigs';

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
        <div className="mt-4">
            <button 
                onClick={handleRun} 
                disabled={processing}
                className={`${
                    processing 
                        ? 'bg-blue-400' 
                        : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded transition-colors`}
            >
                {processing ? 'Running...' : 'Run Code'}
            </button>

            <pre className={`mt-4 p-4 rounded max-h-60 overflow-y-auto whitespace-pre-wrap ${
                output.includes('Rate limit exceeded') 
                    ? 'bg-yellow-900 text-yellow-200' 
                    : 'bg-black text-green-400'
            }`}>
                {output}
            </pre>
        </div>
    );
};

export default CodeCompilation;