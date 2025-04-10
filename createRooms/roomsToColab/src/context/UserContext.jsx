import React, { createContext, useState } from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState({ userName: '', userId: '' });

    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
