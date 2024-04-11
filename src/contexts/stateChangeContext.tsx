'use client'
import React, { createContext, useState, useContext } from 'react';

type StateChangeContextType = {
    stateChanged: boolean;
    setStateChanged: React.Dispatch<React.SetStateAction<boolean>>;
};
const StateChangeContext = createContext<StateChangeContextType | undefined>(undefined);

export function StateChangeProvider({ children }:{children:any}) {
    const [stateChanged, setStateChanged] = useState<boolean>(false);

    return (
        <StateChangeContext.Provider value={{ stateChanged, setStateChanged }}>
            {children}
        </StateChangeContext.Provider>
    );
}

export function useStateChange() {
    const context = useContext(StateChangeContext);
    if (context === undefined) {
        throw new Error('useStateChange must be used within a StateChangeProvider');
    }
    return context;
}
