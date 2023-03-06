import { AiFillGithub } from 'react-icons/ai';

function Footer() {

    let date = new Date().getFullYear();

    return (
        <footer className='flex flex-row items-center justify-center w-full h-14 bg-red-400 sm:flex-col'>
            <p className='text-xl text-center text-white font-medium sm:text-[16px]'>
                Copyright©baltatescuvalentin {date} 
            </p>
            <a href='https://github.com/baltatescuvalentin' target="_blank" rel="noreferrer">
                <AiFillGithub size={28} color='white' />
             </a>
        </footer>
    )
}

export default Footer;