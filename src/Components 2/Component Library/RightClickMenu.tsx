import React, {
    FC,
    ReactNode,
    useEffect,
    useRef
} from 'react';
import { useDispatch } from 'react-redux';



enum RightClickMenuType {
    taskGroup,
}

interface RightClickMenuProps {
    clientX: number,
    clientY: number,
    type: RightClickMenuType,
    dropdownToggled: boolean,
    setDropdown: (b : boolean) => void,
    typeConfig: any
}

interface RCMTypeOptionsProps {
    name: string,
    icon: ReactNode,
    onClick: () => void
}

const RightClickMenu : FC<RightClickMenuProps> = ({
    clientX,
    clientY,
    type,
    dropdownToggled,
    setDropdown,
    typeConfig
} : RightClickMenuProps) => {

    const dispatch = useDispatch();

    const RightClickMenuRef = useRef(null);

    const deleteTaskGroup = () => {

    }

    const RCMTypeOptions : RCMTypeOptionsProps[][] = [
        [
            {
                name: 'Start All',
                icon: 
                <div className="text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>,
                onClick: () => null
            },
            {
                name: 'Stop All',
                icon: 
                <div className="text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                </div>,
                onClick: () => null
            },
            {
                name: 'MLC',
                icon: 
                <div className="text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>,
                onClick: () => null
            },
            {
                name: 'Rename',
                icon: 
                <div className="text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>  
                </div>,
                onClick: () => null
            },
            {
                name: 'Duplicate',
                icon: 
                <div className="text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                </div>,
                onClick: () => null
            },
            {
                name: 'Delete',
                icon: 
                <div className="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>,
                onClick: () => null
            }
        ]
    ]

    const handleMDown = (event : Event) => {
        // @ts-ignore
        if (RightClickMenuRef.current.contains(event.target)) {
            // console.log("Clicked Inside");
        } else {
            setDropdown(false)
        }
    }

    useEffect(() => {
        // selectionArray = [...selectionArray]
        
        document.addEventListener('mousedown', handleMDown)

        return () => {
            document.removeEventListener('mousedown', handleMDown)
        }
    }, [])

    return (
        <div ref={RightClickMenuRef} className={`${dropdownToggled ? 'flex pointer-events-auto' : 'hidden pointer-events-none'} overflow-hidden z-40 absolute rounded-md shadow-md bg-theta-bg border border-theta-gray-7 flex-col justify-start items-center`}
        style={{left: clientX, top: clientY}}>
            {RCMTypeOptions[type].map((option : RCMTypeOptionsProps) => (
                <RCMOption 
                    name={option.name}
                    icon={option.icon}
                    onClick={option.onClick}
                />
            ))}
        </div>
    )
}

interface RCMOptionProps {
    name: string,
    icon: ReactNode,
    onClick: () => void
}

const RCMOption : FC<RCMOptionProps> = ({
    name,
    icon,
    onClick
} : RCMOptionProps) => {
    return (
        <button className="h-7 focus:outline-none transition duration-250 ease-in-out hover:bg-theta-tasks-taskgroup-individual-selected text-xl text-theta-gray-2 font-amedium flex justify-start items-center w-32 px-1"
        onClick={onClick}
        >
            {icon}
            <div className="ml-1 mr-3">
                {name}
            </div>
        </button>
    )
}

export default RightClickMenu;