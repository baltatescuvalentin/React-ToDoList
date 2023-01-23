import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { addToFolders } from "../../../firebase/functions/FirebaseFunctions";

function FoldersForm({closeDialog}) {

    const [name, setName] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const { currentUser } = useAuth();

    function validateForm() {
        return name;
    }

    async function handleForm(e) {
        e.preventDefault();
        
        try {
            setErrorMsg('')
            await addToFolders(name, currentUser.uid);
        }
        catch(e) {
            setErrorMsg(e.message);
        }

        closeDialog();
    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[500px]">
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <label className="text-[18px]" htmlFor="name">Folder Name</label>
            <input type='text' id='desciption' required placeholder='Folder Name...'
                className="mb-4 w-[inherit] text-[22px] outline-none border-b-2 border-gray-800 resize-none" 
                onChange={(e) => setName(e.target.value)}
            />
            { !validateForm() && <p className="text-[18px] mb-2 font-bold text-red-500">Every entry is required!</p>}
            <input type="submit" 
                    disabled={validateForm() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white w-full h-10 ${validateForm() && 'hover:cursor-pointer'} ${validateForm() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Add new folder!"/> 
        </form>
    )
}

export default FoldersForm;