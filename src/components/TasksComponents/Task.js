import { useEffect, useState } from "react";
import { TbListDetails } from 'react-icons/tb';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from "react-icons/fa";
import { deleteTask, updateFinishedTask } from "../../firebase/functions/FirebaseFunctions";
import TaskDialogUpdate from "./dialogs/TaskDialogUpdate";
import { FaRegTimesCircle } from 'react-icons/fa';


function Task({task}) {

    const [click, setClick] = useState(false);
    const [openUpdateTask, setOpenUpdateTask] = useState(false);

    function handleOpenUpdateTask() {
        setOpenUpdateTask(true);
    }

    function handleCloseUpdateTask() {
        setOpenUpdateTask(false);
    }

    let parseDate = '';
    if(task.time)
        parseDate = Date.parse(task.date + "T" + task.time);
    else parseDate = Date.parse(task.date);
 
    console.log(parseDate);
    const formattedDate = new Date(parseDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        weekday: 'short',
        month: 'short',
        year: 'numeric',
    });

    return (
        <>
            <TaskDialogUpdate open={openUpdateTask} task={task} closeDialog={handleCloseUpdateTask} />
            <div className="flex flex-col">
                <div className="flex flex-row bg-gray-200 h-[50px] w-full flex-grow ]">
                    <PriorityBlock priority={task.priority} finished={task.finished} />
                    <div className={`flex flex-row items-center float-right justify-between w-full`}>
                        <div className="flex flex-row items-center">
                            <input onChange={(e) => updateFinishedTask(e.target.checked, task.taskUid)} 
                                className="h-[20px] w-[20px] mr-4" type='checkbox' defaultChecked={task.finished}/>
                            <p className={`font-semibold text-[20px] w-[200px] inline-block overflow-hidden overflow-ellipsis ${task.finished && 'line-through'}`}>
                                {task.name}
                            </p>
                        </div>
                        <div className="flex flex-row items-center [&>*]:mr-4">
                            <p className={`text-[20px] font-semibold xl:text-[16px] ${task.finished && 'line-through'}`}>{formattedDate}</p>
                            <p className={`flex flex-row items-center justify-center  rounded-lg font-semibold text-[20px] px-2 h-[30px] w-[100px] 
                             ${task.finished && 'line-through'}
                             ${task.finished ? 'bg-gray-200 text-black' : task.priority === 1 ? 'bg-red-500' : task.priority === 2 ? 'bg-yellow-500' : task.priority === 3 ? 'bg-green-500' : ''}`}>
                                 { task.priority === 1 ? <span>High</span> : task.priority === 2 ? <span>Medium</span>  : <span>Low</span> }
                            </p>
                            <div onClick={() => setClick(c => !c)}
                                className="flex flex-row items-center justify-center no-underline w-[100px] px-2 hover:cursor-pointer hover:bg-red-300 hover:text-white rounded-lg">
                                <TbListDetails size={20}/>
                                <p className="text-[18px]">{ click ? 'Hide' : 'Details'}</p>
                            </div>
                            <button onClick={handleOpenUpdateTask}
                                className="flex items-center justify-center rounded-lg hover:cursor-pointer hover:bg-gray-50 w-8 h-8">
                                <AiFillEdit size={24} />
                            </button>
                            <button onClick={() => deleteTask(task.taskUid)} 
                                className="flex items-center justify-center rounded-full hover:bg-gray-50 w-8 h-8">
                                <FaTimes size={24} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${!click ? 'hidden' : 'block'} flex flex-row goDownAnimation bg-gray-200 `}>
                    <PriorityBlock priority={task.priority} finished={task.finished} />
                    <div>
                        <p className="font-semibold text-[20px]">{task.name}</p>
                        <p  className="text-[20px]">{task.description}</p>
                        <p className="text-[20px]">When? 
                            <span>{ ' ' + formattedDate}</span>
                            {task.time && <span>{', ' + task.time}</span>}
                        </p>
                        <p className="text-[20px] font-semibold">Task is {!task.finished && 'not'} finished!</p>
                    </div>
                    <div className="flex flex-row">

                    </div>
                </div>
            </div>
        </>
    )
}

function PriorityBlock({priority, finished}) {
    // ${priority === 2 && 'bg-yellow-500'} ${priority === 3 && 'bg-green-500'} ${finished && 'bg-gray-200'}
    return (
        <div className={`w-[10px] mr-4 ${finished ? 'bg-gray-200' : priority === 1 ? 'bg-red-500' : priority === 2 ? 'bg-yellow-500' : priority === 3 ? 'bg-green-500' : ''} `}>
        </div>
    )
}

export default Task;