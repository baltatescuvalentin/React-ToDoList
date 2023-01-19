

function NotesForm({closeDialog}) {
    return (
        <form className="flex flex-col justify-center items-center">
            <input type='text'/>
            <input type='text'/>
            <input type='text'/>
            <button type='submit' onClick={(e) => {
                e.preventDefault();
                closeDialog();
            }}>
                Close
            </button>
        </form>
    )
}

export default NotesForm;