// CheckedContext.js
import { createContext, useContext, useReducer, useMemo } from 'react';
import { checkedReducer } from '../DataGridStateManagement/checkedState/checkedReducer';

const CheckedContext = createContext();

export const CheckedContextProvider = ({ children }) => {
    const [checkedState, checkedDispatch] = useReducer(checkedReducer, {});

    const value = useMemo(() => ({ checkedState, checkedDispatch }), [checkedState]);

    return (
        <CheckedContext.Provider value={value}>
            {children}
        </CheckedContext.Provider>
    );
};

export const useCheckedContext = () => useContext(CheckedContext);