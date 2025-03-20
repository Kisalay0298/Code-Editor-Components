import React from 'react'
import randomColor from'randomcolor' // import the script

const getUserColor = (users) => {
    let storedColor = localStorage.getItem(`color-${users}`)
    if(!storedColor){
        storedColor = randomColor();
        localStorage.setItem(`color-${users}`, storedColor)
    }
    return storedColor
}

const Client = (users) => {

    const color = getUserColor(users.userName)

  return (
    <div key={users.idx} className="flex items-center w-full-[2px] h-12 m-2 border-0 rounded-lg bg-gray-900 px-2">
        <div className="w-7 h-7 text-lg font-bold text-white flex justify-center items-center rounded-full flex-shrink-0" style={{ backgroundColor: color }}><p>{users.userName[0].toUpperCase()}</p></div>
        <p className="text-white text-lg font-semibold truncate w-full px-2">{users.userName}</p>
    </div>
  )
}

export default Client