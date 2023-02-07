import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { firestore } from "../../../firebase/firebase";
import { deleteNote } from "../../../firebase/functions/FirebaseFunctions";
import Spinner from "../../../utils/Spinner";

function NotesGrid() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    useEffect( () => {
        setLoading(true);
        const q = query(collection(firestore, "notes"), where("userUid", "==", currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notesFB = [];
            querySnapshot.forEach((doc) => {
                notesFB.push(doc.data());
                });
                
                setNotes(notesFB);
                setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const Notes = notes?.map((n) => {
        return <Note key={n.noteUid} note={n.note} noteUid={n.noteUid}/>
    })

    return (
        <>
            {   loading ? <Spinner /> :
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] auto-rows-min p-2 gap-2">
                    {Notes.length ? Notes : ''}
                </div>
            }
        </>
    )
}

function Note({note, noteUid}){
    return (
        <div className="flex flex-col border-2 rounded-md p-2 overflow-auto">
            <div onClick={() => deleteNote(noteUid)}
                className='flex flex-row justify-end'>
                <button className="flex items-center justify-center float-right mb-2 rounded-full hover:bg-gray-200 w-6 h-6">
                    <FaTimes size={18} />
                </button>
            </div>

            <p className="text-[20px]">
                {note}
            </p>

        </div>
    )
}

export default NotesGrid;