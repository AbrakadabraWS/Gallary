import { createContext, useContext, useMemo, useReducer } from "react";

import { Reducer, initialState } from "./reducer";

const AppContext = createContext();

export function Context({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
