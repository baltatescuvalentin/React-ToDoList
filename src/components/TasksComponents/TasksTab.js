import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { useAuth } from "../../contexts/AuthContext";
import { useTab } from "../../contexts/TasksTabContext";
import { firestore } from "../../firebase/firebase";
import TaskSkeleton from "../../utils/TaskSkeleton";
import TaskDialogCreate from "./dialogs/TaskDialogCreate";
import Task from "./Task";


const SORT_ACTIONS = {
    DATE_ASC: {column: 'date', order: 'asc'},
    DATE_DESC: {column: 'date', order: 'desc'},
    PRIORITY_ASC: {column: 'priority', order: 'asc'},
    PRIORITY_DESC: {column: 'priority', order: 'desc'},
}

function TasksTab() {
    
    const [tasks, setTasks] = useState([]);
    const [tab, setTab] = useState('inbox');
    const [sortBy, setSortBy] = useState();
    const [loading, setLoading] = useState(false);
    const [openCreateTask, setOpenCreateTask] = useState(false);

    function handleOpenCreateTask() {
        setOpenCreateTask(true);
    }

    function handleCloseCreateTask() {
        setOpenCreateTask(false);
    }

    const { currentUser } = useAuth();
    const { currentTab } = useTab();

    function correctTab() {
        return currentTab !== 'today' && currentTab !== 'upcoming' && currentTab !== 'important' && currentTab !== 'finished';
    }

    function comparePriorityAsc(a, b) {
        return a.priority > b.priority ? 1 : (a.priority < b.priority ? -1 : 0);
    }

    function comparePriorityDesc(a, b) {
        return a.priority < b.priority ? 1 : (a.priority > b.priority ? -1 : 0);
    }

    function compareDateDesc(a, b) {
        return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
    }

    function compareDateAsc(a, b) {
        return a.date > b.date ? 1 : (a.date < b.date ? -1 : 0);
    }

    useEffect(() => {
        setLoading(true);
        let q = null;
        if(tab === 'important') {
            q = query(collection(firestore, "tasks"), 
                where("userUid", "==", currentUser.uid), 
                where('priority', '==', 1),
                where('finished', '==', false));
        }
        else if(tab === 'finished') {
            q = query(collection(firestore, "tasks"), 
                where("userUid", "==", currentUser.uid), 
                where('finished', '==', true));
        }
        else if(tab === 'today') {
            const currDate = new Date().toISOString();
            const fDate = currDate.split('T')[0];

            q = query(collection(firestore, "tasks"), 
                where("userUid", "==", currentUser.uid), 
                where('date', '==', fDate),
                where('finished', '==', false));
        }
        else if(tab === 'upcoming') {
            const currDate = new Date().toISOString();
            const fDate = currDate.split('T')[0];

            q = query(collection(firestore, "tasks"),
                where("userUid", "==", currentUser.uid),
                where('finished', '==', false), 
                where('date', '>', fDate));
        }
        else q = query(collection(firestore, "tasks"), 
            where("userUid", "==", currentUser.uid), 
            where('folderName', '==', tab),
            where('finished', '==', false));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksFB = [];
            querySnapshot.forEach((doc) => {
                tasksFB.push(doc.data());
                });
                
                // if(sortBy.column === 'date') {
                //     if(sortBy.order === 'asc')
                //         tasksFB.sort(compareDateAsc);
                //     else tasksFB.sort(compareDateDesc)
                // }
                // else {
                //     if(sortBy.order === 'asc')
                //         tasksFB.sort(comparePriorityAsc);
                //     else tasksFB.sort(comparePriorityDesc);
                // }
                console.log(tasksFB);
                setTasks(tasksFB);
                setLoading(false);
        });

        return () => unsubscribe();
    }, [tab]);

    useEffect(() =>{
        setTab(currentTab);
        if(currentTab === 'important')
            setSortBy('PRIORITY_ASC');
        else setSortBy('DATE_ASC');
    }, [currentTab]);

    // useEffect(() => {
    //     if(sortBy.column === 'date') {
    //         if(sortBy.order === 'asc')
    //             tasks.sort(compareDateAsc);
    //         else tasks.sort(compareDateDesc)
    //     }
    //     else {
    //         if(sortBy.order === 'asc')
    //             tasks.sort(comparePriorityAsc);
    //         else tasks.sort(comparePriorityDesc);
    //     }
    // }, [sortBy]);

    const Tasks = tasks.map((t) => {
        return <Task key={t.taskUid} task={t} />
    })
 
    function handleSelect(e) {
        setSortBy(e.target.value);
        console.log(sortBy);
        console.log(SORT_ACTIONS[sortBy].column, SORT_ACTIONS[sortBy].order);
    }

    return (
        <>
            <TaskDialogCreate open={openCreateTask} closeDialog={handleCloseCreateTask} />
            <div className="flex flex-col pt-6 px-[5%] w-full">
                <p className="text-[30px]">{ currentUser.displayName || 'test'} 's { tab } tasks</p>
                <div className="flex flex-row justify-between items-center xl:flex-col xl:items-start xl:[&>*]:mb-2">
                    { correctTab() && 
                    <div onClick={handleOpenCreateTask}
                        className={`flex flex-row  items-center float-right px-2 rounded-lg hover:cursor-pointer hover:bg-gray-200 `}>
                        <BsPlusCircleFill size={20} color='tomato' />
                        <p className="ml-2 text-[24px]"> Add new task!</p>
                    </div> }
                    <select value={sortBy === 'DATE_ASC' ? 'Sort by date ascending' : sortBy === 'DATE_DESC' ? 'Sort by date descending' : sortBy === 'PRIORITY_ASC' ? 'Sort by priority ascending' : 'Sort by priority descending'}
                        onChange={handleSelect}
                        className='rounded-md text-[20px] shadow-md'>
                        <option value='DATE_ASC'>
                            Sort by date ascending
                        </option>
                        <option value='DATE_DESC'>
                            Sort by date descending
                        </option>
                        <option value='PRIORITY_ASC'>
                            Sort by priority ascending
                        </option>
                        <option value='PRIORITY_DESC'>
                            Sort by priority descending
                        </option>
                    </select>
                </div>
                {   loading ? <TaskSkeleton /> :
                    <div className="flex flex-col w-full mt-4 [&>*]:mb-4">
                        { Tasks.length ? Tasks : null }
                    </div>
                }
            </div>
        </>
    )
}


export default TasksTab;