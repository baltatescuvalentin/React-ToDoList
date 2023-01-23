import { IoMdDoneAll } from 'react-icons/io';
import { FiInbox } from 'react-icons/fi';
import { TbCalendarEvent, TbCalendarTime } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import { BsPlusCircleFill, BsCircleFill } from 'react-icons/bs';
import { ImFolderOpen } from 'react-icons/im';
import { GoTasklist } from 'react-icons/go';
import { useState } from 'react';
import NotesDialog from './dialogs/NotesDialogCreate';
import Notes from './Notes';
import Folders from './Folders';
import { useTab } from '../../contexts/TasksTabContext';

function Sidebar() {

    const [openCreateFolder, setOpenCreateFolder] = useState(false);

    const { setCurrentTab } = useTab();

    function handleOpenCreateFolder() {
        setOpenCreateFolder(true);
    }

    function handleCloseCreateFolder() {
        setOpenCreateFolder(false);
    }

    return (
        <div className="flex flex-col py-6 px-10 bg-[#f5f5f54d] min-h-full w-[300px] shadow-[4px_0_5px_-2px_rgba(0,_0,_0,_0.7)]">
            <div onClick={() => setCurrentTab('inbox')} 
                className='flex flex-row items-center justify-start rounded-lg hover:bg-gray-200 hover:cursor-pointer'>
                <FiInbox size={30} className='ml-2' color='tomato'/>
                <p className='ml-4 text-[28px]'>Inbox</p>
            </div>

            <div onClick={() => setCurrentTab('today')} 
                className='flex flex-row items-center justify-start rounded-lg hover:bg-gray-200 hover:cursor-pointer'>
                <TbCalendarEvent size={30} className='ml-2' color='tomato' />
                <p className='ml-4 text-[28px]'>Today</p>
            </div>

            <div onClick={() => setCurrentTab('upcoming')}  
                className='flex flex-row items-center justify-start rounded-lg hover:bg-gray-200 hover:cursor-pointer'>
                <TbCalendarTime size={30} className='ml-2' color='tomato' />
                <p className='ml-4 text-[28px]'>Upcoming</p>
            </div>

            <div onClick={() => setCurrentTab('important')}  
                className='flex flex-row items-center justify-start rounded-lg hover:bg-gray-200 hover:cursor-pointer'>
                <BsCircleFill size={30} className='ml-2' color='red' />
                <p className='ml-4 text-[28px]'>Important</p>
            </div>

            <div onClick={() => setCurrentTab('finished')}  
                className='flex flex-row items-center justify-start rounded-lg hover:bg-gray-200 hover:cursor-pointer'>
                <IoMdDoneAll size={30} className='ml-2' color='tomato' />
                <p className='ml-4 text-[28px]'>Finished</p>
            </div>

           <Notes />

            <Folders />
        </div>
    )
}

export default Sidebar;