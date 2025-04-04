import React from "react";
import Editor from "../components/Editor";
import SideBar from "../components/SideBar";

const EditorPage = () => {

  return (
    <div className="min-h-screen w-full flex flex-row bg-gray-800 overflow-hidden relative">
      {/* Sidebar */}
      {/* <div className="flex w-72">
        <SideBar />
      </div> */}
      <SideBar />

      {/* Main Editor Section */}
      <div className="flex-1 text-lg overflow-x-auto">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
