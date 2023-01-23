import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { addToNotes } from "../../../firebase/functions/FirebaseFunctions";



function NotesForm({closeDialog}) {

    // const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const { currentUser } = useAuth();

    function validateForm() {
        return description;
    }

    async function handleForm(e) {
        
        e.preventDefault();

        try {
            setErrorMsg('');
            await addToNotes(description, currentUser.uid);
        }
        catch {
            setErrorMsg('Error saving the note. Try again!')
        }

        closeDialog();
    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[500px]">
            {/* <label className="text-[18px]" htmlFor="name">Name</label>
            <input type='text' id='name' required placeholder='Name...'
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800" 
                onChange={(e) => setName(e.target.value)}
            /> */}
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <label className="text-[18px]" htmlFor="description">Description</label>
            <textarea id='desciption' required placeholder='Description...'
                className="mb-4 h-[100px] w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setDescription(e.target.value)}
            />
            { !validateForm() && <p className="text-[18px] mb-2 font-bold text-red-500">Every entry is required!</p>}
            <input type="submit" 
                    disabled={validateForm() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white w-full h-10 ${validateForm() && 'hover:cursor-pointer'} ${validateForm() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Add note!"/> 
        </form>
    )
}

export default NotesForm;