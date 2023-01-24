import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect, useReducer } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { ImFolderOpen } from "react-icons/im";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase/firebase";
import { compareObjects, deleteFolder, getFolders } from "../../firebase/functions/FirebaseFunctions";
import FoldersDialogCreate from "./dialogs/FoldersDialogCreate";


function Folders() {

    const [openCreateFolder, setOpenCreateFolder] = useState(false);
    const [folders, setFolders] = useState([]);
    const { currentUser } = useAuth();

    //console.log(currentUser);
    
    useEffect(() => {
        async function fetchFolders() {
            try {
                const dbFolders = await getFolders(currentUser.uid);
                if(!compareObjects(folders, dbFolders))
                    setFolders(dbFolders);
                console.log(folders);
            }
            catch(e) {
                console.log(e.message);
                setFolders([]);
            }
        }
        fetchFolders();

        

        // const dbFolders = getFolders(currentUser.uid);
        // setFolders(dbFolders);


        //     const q = query(collection(firestore, 'folders'), where('userUid', '==', currentUser.uid));
        //     const folders = [];
        //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             folders.push(doc.data());
        //         });

        //         setFolders(folders);
        //     });

        // return () => unsubscribe();
    }, [folders]);

    function handleOpenCreateFolder() {
        setOpenCreateFolder(true);
    }

    function handleCloseCreateFolder() {
        setOpenCreateFolder(false);
    }

    const Folders = folders?.map((f) => {
        return <Folder key={f.folderUid} folderName={f.folderName} folderUid={f.folderUid}/>
    })
    
    return (
        <>
            <FoldersDialogCreate open={openCreateFolder} closeDialog={handleCloseCreateFolder} />

            <div className='flex flex-row items-center justify-between mt-6'>
                <div className='flex flex-row px-2 items-center'>
                    <GoTasklist size={36} color='tomato' />
                    <p className='ml-2 text-[32px]'>To Do</p>
                </div>
                <button onClick={handleOpenCreateFolder} className='ml-[auto] hover:cursor-pointer'>
                    <BsPlusCircleFill size={36} color='tomato'/>
                </button>
            </div>
            <div className="flex flex-col pl-4 mt-2">
                {Folders.length ? Folders : ''}
            </div>
        </>
    )
}

function Folder({folderName, folderUid}) {
    return (
        <div className="flex flex-row items-center justify-between w-[inherit]">
            <div className="flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer rounded-lg mx-2 px-2">
                <ImFolderOpen size={24} color='tomato' />
                <p className="text-[24px] ml-2 overflow-ellipsis">{folderName}</p>
            </div>
            <button onClick={() => deleteFolder(folderUid)}
                className="flex items-center justify-center hover:bg-gray-200 rounded-full w-8 h-8 mr-[3px]">
                <FaTimes size={24} />
            </button>
        </div>

    )
}

export default Folders;