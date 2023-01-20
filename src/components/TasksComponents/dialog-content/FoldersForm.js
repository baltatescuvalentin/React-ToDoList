import { useState } from "react";

function FoldersForm({closeDialog}) {

    const [name, setName] = useState('');

    function validateForm() {
        return name;
    }

    function handleForm(e) {
        
        e.preventDefault();

        const formValue = {
            'name': name,
        }

        console.log(formValue);

        closeDialog();
    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[500px]">
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