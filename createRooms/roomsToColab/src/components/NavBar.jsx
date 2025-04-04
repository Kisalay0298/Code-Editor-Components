import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


function NavBar() {
  return (
    // <div className="fixed ml-72 right-0 bg-gray-900 shadow-md h-16 py-2 px-6 flex items-center justify-between z-10 w-[calc(100%-18rem)]">
    //     <div className="text-gray-400 p-7 text-2xl font-semibold"><p>Editor Workspace</p></div>
    //     <div className="text-gray-400 p-7 text-2xl font-semibold">
    //       <option value="JavaScript"></option>
    //       <option value="Python"></option>
    //       <option value="Java"></option>
    //       <option value="C++"></option>
    //     </div>
    // </div>
    <div className="fixed ml-72 right-0 bg-gray-900 shadow-md h-16 py-2 px-6 flex items-center justify-between z-10 w-[calc(100%-18rem)]">
    {/* Title */}
    <div className="text-gray-400 hidden md:block text-2xl font-semibold">
      Editor Workspace
    </div>

    {/* save & run */}
    <div className='flex flex-row'>
      {/* save button */}
      <button className="border hidden md:block border-green-500 text-green-500 hover:text-green-700 hover:border-green-700 rounded-lg font-bold py-2 px-4 mx-2 cursor-pointer"><FontAwesomeIcon icon={faCloudUploadAlt} /><span className='ml-2'>Save</span></button>
      {/* run button */}
      <button className="bg-green-500 hover:bg-green-700  font-bold py-2 px-5 rounded-lg mx-2 cursor-pointer"><FontAwesomeIcon icon={faPlay} /><span className="ml-2">Run</span></button>
    </div>

    {/* Language Selector */}
    <div>
      <select className="bg-gray-800 text-gray-200 text-sm font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-800 cursor-pointer" defaultValue="JavaScript">
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="C++">C++</option>
      </select>
    </div>
  </div>

  )
}
  

export default NavBar
