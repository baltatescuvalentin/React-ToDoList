import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { ImFolderOpen } from "react-icons/im";
import FoldersDialogCreate from "./dialogs/FoldersDialogCreate";


function Folders() {

    const [openCreateFolder, setOpenCreateFolder] = useState(false);

    function handleOpenCreateFolder() {
        setOpenCreateFolder(true);
    }

    function handleCloseCreateFolder() {
        setOpenCreateFolder(false);
    }
    
    return (
        <>
            <FoldersDialogCreate open={openCreateFolder} closeDialog={handleCloseCreateFolder} />

            <div className='flex flex-row items-center justify-between mt-6'>
                <div className='flex flex-row items-center'>
                    <GoTasklist size={36} color='tomato' />
                    <p className='ml-2 text-[32px]'>To Do</p>
                </div>
                <button onClick={handleOpenCreateFolder} className='ml-[auto] hover:cursor-pointer'>
                    <BsPlusCircleFill size={36} color='tomato'/>
                </button>
            </div>
        </>
    )
}

function Folder({folder}) {
    return (
        <div className="flex flex-row items-center justity-between pl-2">
            <div className="flex flex-row items-center">
                <ImFolderOpen size={16} color='tomato' />
                <p>{folder.name}</p>
            </div>
            <button className="flex items-center justify-center hover:bg-gray-200 rounded-full w-4 h-4">
                <FaTimes size={16} />
            </button>
        </div>

    )
}

export default Folders;