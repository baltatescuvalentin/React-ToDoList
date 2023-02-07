import { IoMdDoneAll } from 'react-icons/io';
import { FiInbox } from 'react-icons/fi';
import { TbCalendarEvent, TbCalendarTime } from 'react-icons/tb';
import { BsCircleFill } from 'react-icons/bs';
import Notes from './Notes';
import Folders from './Folders';
import { useTab } from '../../contexts/TasksTabContext';
import { FaTimes } from 'react-icons/fa';

function Sidebar() {

    const { isOpen, handleIsOpen } = useTab();

    return (
        <>

            <div className={`flex flex-col absolute z-10 py-6 px-10 bg-gray-300 min-h-full w-[350px] min-h-full top-0 duration-500 ${isOpen ? 'left-0' : '-left-full'}`}>
                <div className='w-full flex flex-row justify-end items-center'>
                    <button onClick={handleIsOpen} className='rounded-full hover:bg-gray-300 mb-4'>
                        <FaTimes
                            size={30} color='black' className='flex items-center justify-center float-right ' />
                    </button>
                </div>

                <Tabs />

                <Notes />

                <Folders />
            </div>

            <div className="flex flex-col xl:hidden py-6 px-10 bg-[#f5f5f54d] min-h-full w-[350px] shadow-[4px_0_5px_-2px_rgba(0,_0,_0,_0.7)]">
                <Tabs />

                <Notes />

                <Folders />
            </div>
        </>
    )
}

function Tabs() {

    const { setCurrentTab } = useTab();

    return (
        <div>
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
        </div>
    )
}

export default Sidebar;