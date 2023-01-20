import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import NotesDialogCreate from "./dialogs/NotesDialogCreate";
import NotesDialogShow from "./dialogs/NotesDialogShow";


function Notes() {

    const [openNotes, setOpenNotes] = useState(false);
    const [openCreateNote, setOpenCreateNote] = useState(false);

    function handleOpenNotes() {
        setOpenNotes(true);
    }

    function handleCloseNotes() {
        setOpenNotes(false);
    }

    function handleOpenCreateNote() {
        setOpenCreateNote(true);
    }

    function handleCloseCreateNote() {
        setOpenCreateNote(false);
    }

    return (
        <>
            <NotesDialogCreate closeDialog={handleCloseCreateNote} open={openCreateNote}/>
            <NotesDialogShow closeDialog={handleCloseNotes} open={openNotes} />
            <div className='flex flex-row items-center justify-start mt-6'>
                <div className='flex flex-row items-center rounded-lg hover:bg-gray-200 hover:cursor-pointer'
                    onClick={handleOpenNotes}>
                    <CgNotes size={36} color='tomato' />
                    <p className='ml-2 text-[34px]'>Notes</p>
                </div>
                <button onClick={handleOpenCreateNote} className='ml-[auto] hover:cursor-pointer'>
                    <BsPlusCircleFill size={36} color='tomato'/>
                </button>
            </div>
        </>
    )
}

export default Notes;