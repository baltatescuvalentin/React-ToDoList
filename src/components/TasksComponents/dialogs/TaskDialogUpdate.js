import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FaTimes } from 'react-icons/fa';
import TaskFormUpdate from "../dialog-content/TaskFormUpdate";




function TaskDialogUpdate({task, closeDialog, open}) {
    return (
        <Dialog fullWidth
        maxWidth="md" open={open}>
            <DialogTitleCustom closeDialog={closeDialog}/>
            <DialogContent>
                <TaskFormUpdate task={task} closeDialog={closeDialog}/>
            </DialogContent>
        </Dialog>
    )
}

function DialogTitleCustom({closeDialog}) {
    return (

        <DialogTitle className='flex flex-row items-center justify-between'>
            <p className="text-[40px]">
                Update the task
            </p>
            <button onClick={closeDialog} className="flex items-center justify-center rounded-full hover:bg-gray-200 w-10 h-10">
                <FaTimes size={24} />
            </button>
        </DialogTitle>
    )
}

export default TaskDialogUpdate;