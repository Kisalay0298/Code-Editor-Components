import React from 'react';
import randomColor from 'randomcolor'; // import the script

const getUserColor = (userName) => {
    let storedColor = localStorage.getItem(`color-${userName}`);
    if (!storedColor) {
        storedColor = randomColor();
        localStorage.setItem(`color-${userName}`, storedColor);
    }
    return storedColor;
};

const Client = ({ userName, isAdmin }) => {
    const color = getUserColor(userName);

    return (
        <div className="flex items-center w-full-[2px] h-12 m-2 border-0 rounded-lg bg-gray-900 px-2">
            {/* Avatar */}
            <div className="relative">

              <div className="w-9 h-9 text-lg font-bold text-white flex justify-center items-center rounded-full" style={{ backgroundColor: color }} >{userName[0].toUpperCase()}</div>
              
              {/* Admin badge overlay */}
              {
                isAdmin && <img src="/adminIcon.png" alt="admin badge" className="absolute w-3 h-3 bottom-0 right-0" />
              }
              
            </div>

            {/* Username */}
            <p className="text-white text-lg font-semibold truncate w-full px-2">
                {userName}
            </p>
        </div>
    );
};

export default Client;
