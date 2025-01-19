import React, { createContext, useContext, useState, useMemo } from "react";

const OptionsVisibilityContext = createContext();

export const OptionsVisibilityProvider = ({ children }) => {

    const [isOptionsVisible, setIsOptionsVisible] = useState("");

    const values = useMemo(() => ({ isOptionsVisible, setIsOptionsVisible }), [isOptionsVisible])

    return (

        <OptionsVisibilityContext.Provider value={values}>

            {children}

        </OptionsVisibilityContext.Provider>
    );
};

export const useOptionsVisibility = () => useContext(OptionsVisibilityContext);
