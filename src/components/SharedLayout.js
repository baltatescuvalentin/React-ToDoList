import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function SharedLayout() {
    return (
        <div className='flex flex-col'>
            <Header />
            <div className='min-h-[calc(100vh-128px-96px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default SharedLayout;