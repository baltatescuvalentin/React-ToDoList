
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTab } from '../../../contexts/TasksTabContext';
import { addToTasks, updateTask } from '../../../firebase/functions/FirebaseFunctions';

function TaskFormUpdate({task, closeDialog }) {

    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);
    const [time, setTime] = useState(task.time);
    const [priority, setPriority] = useState(task.priority);
    const [finished, setFinished] = useState(task.finished);
    const [errorMsg, setErrorMsg] = useState('');
    
    // useEffect(() => {
    //     setPriority(task.priority);
    //     setName(task.name);
    //     setDescription(task.description);
    //     setDate(task.date);
    //     setTime(task.time);
    //     setFinished(task.finished);
    // }, [])

    const { currentTab } = useTab();

    function validateForm() {
        return name && date && priority;
    }

    async function handleForm(e) {
        e.preventDefault();
        
        try {
            setErrorMsg('')
            await updateTask(currentTab, name, description, date, priority, finished, task.taskUid, time);
            closeDialog();
        }
        catch {
            setErrorMsg('Error updating the task. Try again!');
        }

    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[inherit]">
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <label className="text-[18px]" htmlFor="name">Task name</label>
            <input type='text' id='name' required value={task.name}
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setName(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="description">Description</label>
            <textarea id='desciption' value={task.description}
                className="mb-4 h-[100px] w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="date">Date</label>
            <input type='date' id='date' required value={task.date}
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDate(e.target.value)}
            />

            <label className="text-[18px]" htmlFor="time">Time</label>
            <input type='time' id='time' value={task.time}
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setTime(e.target.value)}
            />
            
            <div className='flex flex-row items-center mb-2'>
                <p className='text-[26px] mr-6'>Priority</p>
                <div onClick={() => setPriority(3)}
                    className={`flex flex-row items-center justify-center w-[100px] rounded-lg font-semibold mx-6 text-[20px] border-2 hover:cursor-pointer border-green-500
                    ${priority === 3 && 'text-black bg-green-500'} `}>
                    Low
                </div>
                <div onClick={() => setPriority(2)}
                    className={`flex flex-row items-center justify-center w-[100px] rounded-lg font-semibold mx-6 text-[20px] border-2 hover:cursor-pointer border-yellow-500
                    ${priority === 2 && 'text-black bg-yellow-500'} `}>
                    Medium
                </div>
                <div onClick={() => setPriority(1)}
                    className={`flex flex-row items-center justify-center w-[100px] rounded-lg font-semibold mx-6 text-[20px] border-2 hover:cursor-pointer border-red-500 
                    ${priority === 1 && 'text-black bg-red-500'} `}>
                    High
                </div>
            </div>
            <label className="flex flex-row items-center text-[30px] mb-2" htmlFor="finished"> Finished
                <input onChange={(e) => setFinished(e.target.checked)}  className="h-[30px] w-[30px] ml-4" defaultChecked={finished} type='checkbox' />
            </label>
            { !validateForm() && <p className="text-[18px] mb-2 font-bold text-red-500">Name, date and priority are required!</p>}
            <input type="submit" 
                    disabled={validateForm() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white  h-10 ${validateForm() && 'hover:cursor-pointer'} ${validateForm() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Update task!"/> 
        </form>
    )
}

export default TaskFormUpdate;