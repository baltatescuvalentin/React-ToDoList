import { createContext, useContext, useState } from "react";


const TasksTabContext = createContext();

export function useTab() {
    return useContext(TasksTabContext);
}

export function TabProvider({children}) {

    const [currentTab, setCurrentTab] = useState('inbox');

    const value = {
        setCurrentTab,
        currentTab,
    }

    return (
        <TasksTabContext.Provider value={value}>
            {children}
        </TasksTabContext.Provider>
    )
}