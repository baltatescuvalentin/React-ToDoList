import { Outlet } from 'react-router-dom';
import { TabProvider } from '../contexts/TasksTabContext';
import Footer from './Footer';
import Header from './Header';
import MobileSidebar from './TasksComponents/MobileSidebar';


function SharedLayout() {
    return (
        <div className='flex flex-col'>
            <Header />
            <div className='min-h-[calc(100vh-128px-56px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default SharedLayout;