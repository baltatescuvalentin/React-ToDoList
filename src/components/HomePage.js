import React from 'react';
import { AiOutlineUserAdd, AiOutlineUser } from 'react-icons/ai';
import { FiThumbsUp } from 'react-icons/fi';
import { TfiHandPointRight } from 'react-icons/tfi';
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <div className='flex flex-col items-center justify-center mt-14 [&>*]:m-3'>
            <p className='text-6xl font-semibold text-center'>Welcome to To-Do List!</p>
            <p className='text-2xl'>This is an app that let's you store and keep track of activities you want to do.</p>
            <p className='text-3xl font-semibold'>What it is offering:</p>
            <div className='flex flex-row items-center [&>*]:mr-2'>
                <FiThumbsUp className='stroke-green-500' size={24} />
                <p className='text-2xl'>Storing the tasks on your personal account!</p>
            </div>
            <div className='flex flex-row items-center [&>*]:mr-2'>
                <FiThumbsUp size={24} className='stroke-green-500' />
                <p className='text-2xl'>Organising the tasks however you like!</p>
            </div>
            <div className='flex flex-row items-center [&>*]:mr-2'>
                <FiThumbsUp size={24} className='stroke-green-500' />
                <p className='text-2xl'>Easy to use interface!</p>
            </div>
            <div className='flex flex-row items-center [&>*]:mr-2'>
                <FiThumbsUp size={24} className='stroke-green-500' />
                <p className='text-2xl'>Support for notes!</p>
            </div>
            <div className='flex flex-row items-center [&>*]:mr-2'>
                <p className='text-3xl font-semibold'>Create an account right now!</p>
                <TfiHandPointRight size={30} />
                <Link to='signup'>
                    <AiOutlineUserAdd className='hover:cursor-pointer' size={40} />
                </Link>
            </div>

            <div className='flex flex-row items-center [&>*]:mr-2'>
                <p className='text-3xl font-semibold'>Or sign in your account!</p>
                <TfiHandPointRight size={30} />
                <Link to='signin'>
                    <AiOutlineUser className='hover:cursor-pointer' size={40} />
                </Link>
            </div>
        </div>  
    )
}

export default HomePage;