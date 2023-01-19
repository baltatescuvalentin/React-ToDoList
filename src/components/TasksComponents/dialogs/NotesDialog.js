import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FaTimes } from 'react-icons/fa';
import NotesForm from "../dialog-forms/NotesForm";


function NotesDialog({closeDialog, open}) {
    return (
        <Dialog open={open}>
            <DialogTitleCustom closeDialog={closeDialog}/>
            <DialogContent>
                <NotesForm closeDialog={closeDialog}/>
            </DialogContent>
        </Dialog>
    )
}

function DialogTitleCustom({closeDialog}) {
    return (

        <DialogTitle className='flex flex-row items-center justify-between'>
            <p className="text-[40px]">
                Create Note
            </p>
            <button onClick={closeDialog} className="flex items-center justify-center rounded-full hover:bg-gray-200 w-10 h-10">
                <FaTimes size={24} />
            </button>
        </DialogTitle>
    )
}

export default NotesDialog;