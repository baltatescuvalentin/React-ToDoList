import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FaTimes } from 'react-icons/fa';
import NotesGrid from "../dialog-content/NotesGrid";



function NotesDialogShow({closeDialog, open}) {
    return (
        <Dialog fullWidth
            maxWidth="lg" open={open}>
            <DialogTitleCustom closeDialog={closeDialog}/>
            <DialogContent>
                <NotesGrid />
            </DialogContent>
        </Dialog>
    )
}

function DialogTitleCustom({closeDialog}) {
    return (

        <DialogTitle className='flex flex-row items-center justify-between'>
            <p className="text-[40px] sm:text-[30px]">
                Your Notes
            </p>
            <button onClick={closeDialog} className="flex items-center justify-center rounded-full hover:bg-gray-200 w-10 h-10">
                <FaTimes size={24} />
            </button>
        </DialogTitle>
    )
}

export default NotesDialogShow;