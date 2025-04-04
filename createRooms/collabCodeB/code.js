const handleRunCode = async () => {
    const code = viewRef.current?.state.doc.toString();
  
    const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
  
    const requestData = {
      source_code: code,
      language_id: 63, // 63 = JavaScript (Node.js); see full list below
    };
  
    try {
      const response = await fetch(JUDGE0_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY_HERE", // Replace with your key
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
      console.log("Judge0 output:", result);
      alert(`🧪 Output:\n${result.stdout || result.stderr || "No output"}`);
    } catch (error) {
      console.error("❌ Error calling Judge0:", error);
      alert("Failed to run code.");
    }
  };
  