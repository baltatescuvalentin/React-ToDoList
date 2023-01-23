import { TabProvider } from "../../contexts/TasksTabContext";
import Sidebar from "./Sidebar";
import TasksTab from "./TasksTab";


function Wrapper() {

    return(
        <div className="flex flex-row min-h-[inherit]">
            <TabProvider>
                <Sidebar />
                <TasksTab />
            </TabProvider>
        </div>
    )
}

export default Wrapper;