import { MdOutlineAccountCircle } from 'react-icons/md'; 
import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';


function Profile() {
    const [hover, setHover] = useState(false);
    const navigator = useNavigate();
    let profile = true;

    function changeHover() {
        setHover(h => !h);
    }

    function goTo(route) {
        navigator(route)
    }

    return (
        <div className='flex flex-col items-center justify-center -translate-x-10' onMouseEnter={changeHover} onMouseLeave={changeHover}>
            <MdOutlineAccountCircle color='#FFFAFA' size={56} />
            {
                hover ? profile ?
                    <div className='rounded-lg mt-[120px] flex flex-col items-center justify-center border border-gray-300 shadow-md divide-x-0 divide-solid w-36  bg-white absolute'>
                        <div className='hover:cursor-pointer hover:text-gray-400 mb-1 font-medium text-gray-600 text-2xl' onClick={() => goTo('login')}>Log In</div>
                        <div className='hover:cursor-pointer hover:text-gray-400 font-medium text-gray-600 text-2xl' onClick={() => goTo('signup')}>Sign up</div>
                    </div> :
                    <div className='rounded-lg mt-[96px] flex flex-col items-center justify-center border border-gray-300 shadow-md divide-x-0 divide-solid w-36  bg-white absolute'>
                        <div className='hover:cursor-pointer font-medium text-gray-600 text-2xl m-2'>
                            Sign Out
                        </div>
                    </div>
                    : ''
            }
            
        </div>
    )
}

export default Profile;