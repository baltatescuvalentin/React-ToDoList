import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useTab } from "../../contexts/TasksTabContext";
import TaskDialogCreate from "./dialogs/TaskDialogCreate";

const SORT_ACTIONS = {
    'TIME_ASC': {column: 'date', order: 'asc'},
    'TIME_DESC': {column: 'date', order: 'desc'},
    'PRIORITY_ASC': {column: 'priority', order: 'asc'},
    'PRIORITY_DESC': {column: 'priority', order: 'desc'},
}

function TasksTab() {

    const [sortBy, setSortBy] = useState();
    const [openCreateTask, setOpenCreateTask] = useState();

    function handleOpenCreateTask() {
        setOpenCreateTask(true);
    }

    function handleCloseCreateTask() {
        setOpenCreateTask(false);
    }

    const { currentUser } = useAuth();
    const { currentTab } = useTab();

    return (
        <>
            <TaskDialogCreate open={openCreateTask} closeDialog={handleCloseCreateTask} />
            <div className="flex flex-col pt-6 px-[5%] w-full">
                <p className="text-[30px]">{ currentUser.displayName} 's { currentTab } tasks</p>
                <div className="flex flex-row justify-between items-center">
                    <div onClick={handleOpenCreateTask}
                        className="flex flex-row  items-center px-2 rounded-lg hover:cursor-pointer hover:bg-gray-200">
                        <BsPlusCircleFill size={20} color='tomato' />
                        <p className="ml-2 text-[24px]"> Add new task!</p>
                    </div>
                    <select className='rounded-md text-[20px] shadow-md'>
                        <option onClick={() => setSortBy(SORT_ACTIONS.TIME_ASC)} value={'Sort by time ascending'}>
                            Sort by time ascending
                        </option>
                        <option onClick={() => setSortBy(SORT_ACTIONS.TIME_DESC)} value={'Sort by time descending'}>
                            Sort by time descending
                        </option>
                        <option onClick={() => setSortBy(SORT_ACTIONS.PRIORITY_ASC)} value={'Sort by priority ascending'}>
                            Sort by priority ascending
                        </option>
                        <option onClick={() => setSortBy(SORT_ACTIONS.PRIORITY_DESC)} value={'Sort by priority descending'}>
                            Sort by priority descending
                        </option>
                    </select>
                </div>
            </div>
        </>
    )
}


export default TasksTab;