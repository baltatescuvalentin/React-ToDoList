import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';


function TaskForm({ closeDialog }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { currentUser } = useAuth();

    function validateForm() {
        return name && date && priority;
    }

    async function handleForm(e) {
        e.preventDefault();
        
        try {
            setErrorMsg('')
            //wait addToFolders(name, currentUser.uid);
        }
        catch {
            setErrorMsg('Error creating the folder. Try again!');
        }

        closeDialog();
    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[inherit]">
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <label className="text-[18px]" htmlFor="name">Task name</label>
            <input type='text' id='desciption' required placeholder='Folder Name...'
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setName(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="description">Description</label>
            <textarea id='desciption'  placeholder='Description...'
                className="mb-4 h-[100px] w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-[18px]" htmlFor="name">Date</label>
            <input type='date' id='desciption' required 
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDate(e.target.value)}
            />
            
            <div className='flex flex-row items-center mb-2'>
                <p className='text-[26px] mr-6'>Priority</p>
                <div onClick={() => setPriority(2)}
                    className={`flex flex-row items-center justify-center w-[100px] rounded-lg font-semibold mx-6 text-[20px] border-2 hover:cursor-pointer border-green-500 text-green-500
                    ${priority === 2 && 'bg-green-500 text-gray-200'} `}>
                    Low
                </div>
                <div onClick={() => setPriority(1)}
                    className={`flex flex-row items-center justify-center w-[100px] rounded-lg font-semibold mx-6 text-[20px] border-2 hover:cursor-pointer border-yellow-500 text-yellow-500
                    ${priority === 1 && 'bg-yellow-500 text-gray-200'} `}>
                    Medium
                </div>
                <div onClick={() => setPriority(0)}
                    className={`flex flex-row items-center justify-center w-[100px] rounded-lg font-semibold mx-6 text-[20px] border-2 hover:cursor-pointer border-red-500 text-red-500
                    ${priority === 0 && 'bg-red-500 text-gray-200'} `}>
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