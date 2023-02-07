import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FaTimes } from 'react-icons/fa';
import TaskForm from "../dialog-content/TaskForm";



function TaskDialogCreate({closeDialog, open}) {
    return (
        <Dialog fullWidth
        maxWidth="md" open={open}>
            <DialogTitleCustom closeDialog={closeDialog}/>
            <DialogContent>
                <TaskForm closeDialog={closeDialog}/>
            </DialogContent>
        </Dialog>
    )
}

function DialogTitleCustom({closeDialog}) {
    return (

        <DialogTitle className='flex flex-row items-center justify-between'>
            <p className="text-[40px] sm:text-[30px]">
                Create New Task
            </p>
            <button onClick={closeDialog} className="flex items-center justify-center rounded-full hover:bg-gray-200 w-10 h-10">
                <FaTimes size={24} />
            </button>
        </DialogTitle>
    )
}

export default TaskDialogCreate;