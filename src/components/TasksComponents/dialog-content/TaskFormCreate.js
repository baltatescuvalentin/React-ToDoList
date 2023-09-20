import TaskForm from "./TaskForm";
import { addToTasks } from '../../../firebase/functions/FirebaseFunctions';
import { useState } from "react";

const TaskFormCreate = ({ closeDialog }) => {

    const [errorMsg, setErrorMsg] = useState('');

    async function handleForm(e, currentTab, name, description, date, priority, finished=false, currentUserUid, time) {
        e.preventDefault();
        
        try {
            setErrorMsg('')
            await addToTasks(currentTab, name, description, date, priority, finished, currentUserUid, time);
            closeDialog();
        }
        catch {
            setErrorMsg('Error creating the task. Try again!');
        }

    }

    return (
        <TaskForm closeDialog={closeDialog} handleForm={handleForm} errorMsg={errorMsg}/>
    )
}

export default TaskFormCreate;