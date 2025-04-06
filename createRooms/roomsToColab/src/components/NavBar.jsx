import React from 'react';
import { languageConfigs } from '../utils/languageConfigs';

const NavBar = ({ currentLanguage, onLanguageChange }) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-gray-400 hidden md:block text-2xl font-semibold">Editor Workspace</h1>
                <select
                    value={currentLanguage}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="bg-gray-800 text-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-800 cursor-pointer rounded-md"
                >
                    {Object.keys(languageConfigs).map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default NavBar;