
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTab } from '../../../contexts/TasksTabContext';

function TaskForm({task=null, closeDialog, handleForm, update=false, errorMsg }) {

    let nameVal, desciptionVal, dateVal, timeVal, priorityVal, finishedVal, isTask = false;

    if(task) {
        nameVal = task.name;
        desciptionVal = task.description;
        dateVal = task.date;
        timeVal = task.time;
        priorityVal = task.priority;
        finishedVal = task.finished;
        isTask = true;
    }
    else {
        nameVal = '';
        desciptionVal = '';
        dateVal = null;
        timeVal = '';
        priorityVal = 0;
        finishedVal = false;
    }

    const [name, setName] = useState(nameVal);
    const [description, setDescription] = useState(desciptionVal);
    const [date, setDate] = useState(dateVal);
    const [time, setTime] = useState(timeVal);
    const [priority, setPriority] = useState(priorityVal);
    const [finished, setFinished] = useState(finishedVal);
    
    const { currentTab } = useTab();
    const { currentUser } = useAuth();

    let uid;
    if(isTask) {
        uid = task.taskUid;
    }
    else {
        uid = currentUser.uid;
    }

    function validateForm() {
        return name && date && priority;
    }

    /*async function handleForm(e) {
        e.preventDefault();
        
        try {
            setErrorMsg('')
            await addToTasks(currentTab, name, description, date, priority, false, currentUser.uid, time);
            closeDialog();
        }
        catch {
            setErrorMsg('Error creating the task. Try again!');
        }

    }*/

    return (
        <form onSubmit={(e) => handleForm(e, currentTab, name, description, date, priority, finished, uid, time)} className="flex flex-col w-[inherit]">
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <label className="text-[18px]" htmlFor="name">Task name</label>
            <input type='text' id='name' required placeholder='Task Name...' value={name}
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setName(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="description">Description</label>
            <textarea id='desciption'  placeholder='Description...' value={description}
                className="mb-4 h-[100px] w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="date">Date</label>
            <input type='date' id='date' required value={date}
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDate(e.target.value)}
            />

            <label className="text-[18px]" htmlFor="time">Time</label>
            <input type='time' id='time' value={time}
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setTime(e.target.value)}
            />
            
            <div className='flex flex-row items-center mb-2 sm:hidden'>
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

            <div className='flex flex-row items-center hidden mb-2 sm:block'>
                <p className='text-[26px] mr-6'>Priority</p>
                <div className='flex flex-row items-center [&>*]:mx-2'>
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
            </div>
            {update && (
                <label className="flex flex-row items-center text-[30px] mb-2" htmlFor="finished"> Finished
                    <input onChange={(e) => setFinished(e.target.checked)}  className="h-[30px] w-[30px] ml-4" defaultChecked={finished} type='checkbox' />
                </label>
            )}
            { !validateForm() && <p className="text-[18px] mb-2 font-bold text-red-500">Name, date and priority are required!</p>}
            <input type="submit" 
                    disabled={validateForm() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white  h-10 ${validateForm() && 'hover:cursor-pointer'} ${validateForm() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value={`${update? 'Update task!' : 'Add new task!'}`}/> 
        </form>
    )
}

export default TaskForm;