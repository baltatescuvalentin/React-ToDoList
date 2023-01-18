import Sidebar from "./Sidebar";


function Wrapper() {
    return(
        <div className="flex flex-row min-h-[inherit]">
            <Sidebar />
            <p> text </p>
        </div>
    )
}

export default Wrapper;