import { createContext, useContext, useState } from "react";


const TasksTabContext = createContext();

export function useTab() {
    return useContext(TasksTabContext);
}

export function TabProvider({children}) {

    const [currentTab, setCurrentTab] = useState('inbox');

    const [isOpen, setIsOpen] = useState(false);

    function handleIsOpen() {
        setIsOpen(open => !open);
    }

    const value = {
        setCurrentTab,
        currentTab,
        isOpen,
        handleIsOpen,
    }

    return (
        <TasksTabContext.Provider value={value}>
            {children}
        </TasksTabContext.Provider>
    )
}