import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useTab } from "../../contexts/TasksTabContext";
import { firestore } from "../../firebase/firebase";
import TaskSkeleton from "../../utils/TaskSkeleton";
import TaskDialogCreate from "./dialogs/TaskDialogCreate";
import Task from "./Task";
import useStateRef from "react-usestateref";

const SORT_ACTIONS = {
    DATE_ASC: {column: 'date', order: 'asc'},
    DATE_DESC: {column: 'date', order: 'desc'},
    PRIORITY_ASC: {column: 'priority', order: 'asc'},
    PRIORITY_DESC: {column: 'priority', order: 'desc'},
}

function TasksTab() {
    
    const [tasks, setTasks] = useState([]);
    const [tab, setTab] = useState('inbox');
    const [sortBy, setSortBy, sortByRef] = useStateRef('DATE_ASC');
    let sortByAux = sortByRef.current;
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
        return a.priority < b.priority ? 1 : (a.priority > b.priority ? -1 : 0);
    }

    function comparePriorityDesc(a, b) {
        return a.priority > b.priority ? 1 : (a.priority < b.priority ? -1 : 0);
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
                where('finished', '==', false),
                orderBy('date', 'asc'));
        }
        else if(tab === 'finished') {
            q = query(collection(firestore, "tasks"), 
                where("userUid", "==", currentUser.uid), 
                where('finished', '==', true),
                orderBy('date', 'asc'));
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
                where('date', '>', fDate),
                orderBy('date', 'asc'));
        }
        else q = query(collection(firestore, "tasks"), 
            where("userUid", "==", currentUser.uid), 
            where('folderName', '==', tab),
            where('finished', '==', false),
            orderBy('date', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksFB = [];
            querySnapshot.forEach((doc) => {
                tasksFB.push(doc.data());
                });
                setTasks(tasksFB);
                setLoading(false);
        });

        return () => unsubscribe();
    }, [tab]);

    useEffect(() =>{
        setTab(currentTab);
    }, [currentTab]);

    useEffect(() => {
        sortByAux = 'DATE_ASC';
    }, [tab]);
    

    let Tasks = tasks.map((t) => {
        return <Task key={t.taskUid} task={t} />
    });

    function sortByCriteria() {
        if(SORT_ACTIONS[sortByAux].column === 'date') {
            if(SORT_ACTIONS[sortByAux].order === 'asc')
                tasks.sort(compareDateAsc);
            else tasks.sort(compareDateDesc)
        }
        else {
            if(SORT_ACTIONS[sortByAux].order === 'asc')
                tasks.sort(comparePriorityAsc);
            else tasks.sort(comparePriorityDesc);
        }

        setTasks(tasks);
    }

    // useEffect(() => {
    //     if(SORT_ACTIONS[sortByAux].column === 'date') {
    //         if(SORT_ACTIONS[sortByAux].order === 'asc')
    //             tasks.sort(compareDateAsc);
    //         else tasks.sort(compareDateDesc)
    //     }
    //     else {
    //         if(SORT_ACTIONS[sortByAux].order === 'asc')
    //             tasks.sort(comparePriorityAsc);
    //         else tasks.sort(comparePriorityDesc);
    //     }

    //     console.log(tasks);
    //     setTasks(tasks);
    //     handleUpdate();

    // }, [sortByAux]);

 
    function handleSelect(e) {
        setSortBy(e.currentTarget.value);
        sortByAux = sortByRef.current;
        sortByCriteria();
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
                    <select value={sortByAux}
                        onChange={(e) => handleSelect(e)}
                        className='rounded-md text-[20px] shadow-md'>
                        <option value='DATE_ASC'>
                            Sort by date ascending
                        </option>
                        <option value='DATE_DESC'>
                            Sort by date descending
                        </option>
                       { currentTab !== 'important' && <option value='PRIORITY_ASC'>
                            Sort by priority ascending
                        </option>}
                        { currentTab !== 'important' && <option value='PRIORITY_DESC'>
                            Sort by priority descending
                        </option>}
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