import logo from '../utils/images/to-do-list.png';
import Profile from '../utils/Profile';


function Header() {

    return (
        <div className='flex flex-row items-center justify-between h-32 w-full bg-red-400 p-5 gap-2'>
            <div className='flex flex-row items-center'>
                <img className='h-16 w-18 ml-10 mr-2' src={logo}/>
                <p className='text-7xl text-white font-bold sm:hidden'>To-Do List</p>
            </div>
            <Profile />
        </div>
    )
}

export default Header;