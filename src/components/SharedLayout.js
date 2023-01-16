import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function SharedLayout() {
    return (
        <div className='flex flex-col'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default SharedLayout;