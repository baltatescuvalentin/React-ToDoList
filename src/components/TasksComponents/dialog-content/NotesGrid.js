import { FaTimes } from "react-icons/fa"


const notes = [
    {
        title: 'note1',
        text: 'Acesta este un test\n',
    },
    {
        title: 'note2',
        text: 'This is a test\t Hope it works, i it looks good'
    },
    {
        title: 'note3 dwad wdawd wda dwadw',
        text: 'Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba '
    },
    {
        title: 'note4',
        text: 'Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba '
    },
    {
        title: 'note5',
        text: 'Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba '
    },
    {
        title: 'note6',
        text: 'Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba '
    },
    {
        title: 'note7',
        text: 'Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba Alibaba '
    }
]

function NotesGrid() {

    const Notes = notes?.map((n) => {
        return <Note key={n.title} note={n} />
    })

    return (
        <div className="grid grid-cols-4 auto-rows-[200px] p-2 gap-2">
            {Notes.length && Notes}
        </div>

    )
}

function Note({note}){
    return (
        <div className="flex flex-col border-2 rounded-md p-2 overflow-auto">
            <div className='flex flex-row justify-end'>
                <button className="flex items-center justify-center float-right mb-2 rounded-full hover:bg-gray-200 w-6 h-6">
                    <FaTimes size={18} />
                </button>
            </div>

            <p>
                {note.text}
            </p>

        </div>
    )
}

export default NotesGrid;