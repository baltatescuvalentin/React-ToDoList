import { useTab } from "../contexts/TasksTabContext";
import { GiHamburgerMenu } from 'react-icons/gi';

function Menu() {

    const { handleIsOpen } = useTab();

    return (
        <button onClick={handleIsOpen} 
            className='rounded border-2 border-black hidden w-[30px] xl:block '>
                <GiHamburgerMenu size={25}/>
        </button>
    )
}

export default Menu;