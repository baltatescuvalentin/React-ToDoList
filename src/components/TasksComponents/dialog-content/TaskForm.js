
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTab } from '../../../contexts/TasksTabContext';
import { addToTasks } from '../../../firebase/functions/FirebaseFunctions';


function TaskForm({ closeDialog }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState();
    const [time, setTime] = useState('');
    const [priority, setPriority] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    
    const { currentTab } = useTab();
    const { currentUser } = useAuth();

    function validateForm() {
        return name && date && priority;
    }

    async function handleForm(e) {
        e.preventDefault();
        
        try {
            setErrorMsg('')
            await addToTasks(currentTab, name, description, date, priority, false, currentUser.uid, time);
            closeDialog();
        }
        catch {
            setErrorMsg('Error creating the task. Try again!');
        }

    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[inherit]">
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <label className="text-[18px]" htmlFor="name">Task name</label>
            <input type='text' id='name' required placeholder='Task Name...'
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setName(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="description">Description</label>
            <textarea id='desciption'  placeholder='Description...'
                className="mb-4 h-[100px] w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="date">Date</label>
            <input type='date' id='date' required 
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDate(e.target.value)}
            />

            <label className="text-[18px]" htmlFor="time">Time</label>
            <input type='time' id='time' 
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
            { !validateForm() && <p className="text-[18px] mb-2 font-bold text-red-500">Name, date and priority are required!</p>}
            <input type="submit" 
                    disabled={validateForm() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white  h-10 ${validateForm() && 'hover:cursor-pointer'} ${validateForm() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Add new task!"/> 
        </form>
    )
}

export default TaskForm;