import { TabProvider } from "../../contexts/TasksTabContext";
import Sidebar from "./Sidebar";
import TasksTab from "./TasksTab";


function Wrapper() {

    return(
        <TabProvider>
            <div className="flex flex-row min-h-[inherit] relative">
                <Sidebar />
                <TasksTab />
            </div>
        </TabProvider>   
    )
}

export default Wrapper;