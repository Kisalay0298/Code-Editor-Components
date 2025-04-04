import React from "react";
import Editor from "../components/Editor";
import SideBar from "../components/SideBar";

const EditorPage = () => {

  return (
    <div className="min-h-screen flex flex-row bg-gray-800 overflow-hidden relative">
      {/* Sidebar */}
      <SideBar />

      {/* Main Editor Section */}
      <div className="flex-1 text-lg overflow-x-auto">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
