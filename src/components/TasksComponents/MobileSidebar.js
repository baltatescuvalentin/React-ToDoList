import { FaTimes } from "react-icons/fa";
import { useTab } from "../../contexts/TasksTabContext";
import Folders from "./Folders";
import Notes from "./Notes";
import { Tabs } from "./Sidebar";


function MobileSidebar() {

    const { isOpen, handleIsOpen } = useTab();

    return (
        <div className={`flex flex-col fixed z-10 py-6 px-10 bg-gray-300 h-[100dvh] overflow-y-auto w-full top-0 duration-500 ${isOpen ? 'left-0' : '-left-full'}`}>
                <div className='w-full flex flex-row justify-end items-center'>
                    <button onClick={handleIsOpen} className='rounded-full hover:bg-gray-300 mb-4'>
                        <FaTimes
                            size={30} color='black' className='flex items-center justify-center float-right ' />
                    </button>
                </div>

                <Tabs handleIsOpen={handleIsOpen}/>

                <Notes />

                <Folders handleIsOpen={handleIsOpen}/>
        </div>
    )
}

export default MobileSidebar;