


function TaskSkeleton() {
    <div className="flex flex-row items-center justify-between bg-gray-200 h-[50px] w-full flex-grow ]">
        <div>
            <input className="h-[20px] w-[20px] mr-4" type='checked' disabled />
            <div className="h-[25px] w-[100px] bg-gray-600 rounded"></div>
        </div>
        <div>
            <div className="bg-gray-600 rounded h-[25px] w-[25px]"></div>
            <div className="bg-gray-600 rounded h-[25px] w-[25px]"></div>
            <div className="bg-gray-600 rounded h-[25px] w-[50px]"></div>
            <div className="bg-gray-600 rounded h-[25px] w-[75px]"></div>
        </div>
    </div>
}

export default TaskSkeleton;