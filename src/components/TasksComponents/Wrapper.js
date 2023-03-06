import { TabProvider } from "../../contexts/TasksTabContext";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import TasksTab from "./TasksTab";


function Wrapper() {

    return(
        <TabProvider>
            <MobileSidebar />
            <div className="flex flex-row min-h-[inherit] relative">
                <Sidebar />
                <TasksTab />
            </div>
        </TabProvider>
    )
}

export default Wrapper;