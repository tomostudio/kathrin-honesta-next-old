import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    // Detect cursor hover
    const [cursorType, setCursorType] = useState("");

    // Detect cursor
    const cursorChangeHandler = (cursorType) => {
        setCursorType(cursorType);
    };

    const values = React.useMemo(
        () => ({
            cursorType,
            cursorChangeHandler
        }),
        [cursorType]
    );

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);

    return context;
}