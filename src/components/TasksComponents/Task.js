import { useEffect, useState } from "react";
import { TbListDetails } from 'react-icons/tb';
import { AiFillEdit } from 'react-icons/ai';
import { FaTimes } from "react-icons/fa";
import { deleteTask } from "../../firebase/functions/FirebaseFunctions";
import TaskDialogUpdate from "./dialogs/TaskDialogUpdate";


function Task({task}) {

    const [click, setClick] = useState(false);
    const [openUpdateTask, setOpenUpdateTask] = useState(false);

    function handleOpenUpdateTask() {
        setOpenUpdateTask(true);
    }

    function handleCloseUpdateTask() {
        setOpenUpdateTask(false);
    }


    console.log(task.date);
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
            <div className="flex flex-row bg-gray-200 h-[50px] w-full flex-grow hover:shadow-[0px_13px_27px_-5px_rgba(50,_50,_93,_0.25),0px_8px_16px_-8px_rgba(0,_0,_0,_0.3)]">
                <div className={`w-[10px] mr-4 ${task.priority === 1 && 'bg-red-500'} ${task.priority === 2 && 'bg-yellow-500'} ${task.priority === 3 && 'bg-green-500'}`}>
                </div>
                <div className="flex flex-row items-center float-right justify-between w-full">
                    <div className="flex flex-row items-center">
                        <input className="h-[20px] w-[20px] mr-4" type='checkbox'/>
                        <p className="font-semibold text-[20px] w-[200px] inline-block overflow-hidden overflow-ellipsis">{task.name}</p>
                    </div>
                    <div className="flex flex-row items-center [&>*]:mr-4">
                        <p className="text-[20px] font-semibold xl:text-[16px]">{formattedDate}</p>
                        <p className={`flex flex-row items-center justify-center  rounded-lg font-semibold text-[20px] px-2 h-[30px] w-[100px] ${task.priority === 1 && 'bg-red-500 text-gray-200'}  ${task.priority === 2 && 'bg-yellow-500 text-gray-200'}  ${task.priority === 3 && 'bg-green-500 text-gray-200'}`}>
                            { task.priority === 1 ? <span>High</span> : task.priority === 2 ? <span>Medium</span>  : <span>Low</span> }
                        </p>
                        <div className="flex flex-row items-center px-2 hover:cursor-pointer hover:bg-red-300 hover:text-white rounded-lg">
                            <TbListDetails size={20}/>
                            <p className="text-[18px]">Details</p>
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
        </>
    )
}

export default Task;