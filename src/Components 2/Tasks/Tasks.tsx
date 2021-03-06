import React, {
    FC, useState, useEffect, useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { beginSave, deleteTaskGroup2, TaskGroup as TaskGroupInterface, TaskSaveState } from '../../redux/reducers/tasksSlice';
import { RootState } from '../../redux/store';
import { saveTaskGroup } from '../../redux/reducers/tasksSlice';
import TaskGroupInterfaceRenderer from './TaskGroupInterfaceRenderer'

const TaskGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
)

const CartedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
)

const AddTaskGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
)


interface TaskGroupIndicatorTagProps {
    color: string,
    num: number,
    border: string,
    icon: any
}

const TaskGroupIndicatorTag : FC<TaskGroupIndicatorTagProps> = ({
    color,
    num,
    border,
    icon
} : TaskGroupIndicatorTagProps) => {
    return (
        <button className={`focus:outline-none transition ease-in-out duration-250 hover:border-theta-gray-2 hover:shadow-md px-1 font-medium text-theta-white text-sm ${color} rounded-md flex flex-row justify-start items-center border ${border}`}>
            <div className="mr-1">
                {num}
            </div>
            {icon}
        </button>
    )
}

interface LoadingIndicatorProps {
    size: number
}

const LoadingIndicator : FC<LoadingIndicatorProps>= ({
    size
} : LoadingIndicatorProps) => {
    return (
        <div 
            className={`animate-spin h-${size} w-${size} loader ease-linear rounded-full border-2 border-t-2 border-gray-300`}
        style={{
            borderTopColor: '#9CA3AF'
        }}>
        </div>
    )
}

interface TaskGroupProps {
    taskGroups: string[],
    setTaskGroups: (tg : string[]) => void,
    name: string,
    selectedTaskGroup: string,
    setSelectedTaskGroup: (s : string) => void
}

const TaskGroup : FC<TaskGroupProps> = ({
    taskGroups,
    setTaskGroups,
    name,
    selectedTaskGroup,
    setSelectedTaskGroup
} : TaskGroupProps) => {

    const handleClick = () => {
        setSelectedTaskGroup(name);
    }

    // const dispatch = useDispatch()
    const commander = useSelector((state : RootState) => state.tasks.taskGroupCommanders[name].deleteAll)
    const initialRender1 = useRef(commander)
    useEffect(() => {
        if (initialRender1.current !== commander) {
            // dispatch(deleteTaskGroup2(name))
            setTaskGroups(taskGroups.filter(tg => tg !== name))
        }
    }, [commander])


    return (
        // @ts-ignore
        <div tgName={name} className="w-full h-auto px-2 taskGroup">
            <button className="w-full focus:outline-none"
            onClick={() => handleClick()}
            >
                <div className={`transition transform duration-250 ease-in-out hover:scale-105 p-1 ${selectedTaskGroup === name ? 'bg-theta-tasks-taskgroup-individual-selected' : 'bg-theta-tasks-taskgroup-individual'} flex flex-row justify-between items-start border ${selectedTaskGroup === name ? 'border-theta-gray-2' : 'border-theta-tasks-taskgroup-border'} shadow-md rounded-md w-full h-full`}>
                    <div className="w-full flex flex-col justify-between items-start space-y-2">
                        <div className={`transition duration-250 ease-in-out ${selectedTaskGroup === name ? 'text-theta-gray-2' : 'text-theta-tasks-taskgroup-text-3'} px-1 font-medium `}>
                            {name}
                        </div>

                        {/* Icons for tasks */}
                        <div className="flex flex-row justify-start items-center space-x-2">
                            <TaskGroupIndicatorTag 
                                num={0}
                                color={'bg-theta-tasks-taskgroup-tags-idle'}
                                border={'border-theta-tasks-taskgroup-tags-idle-border'}
                                icon={<LoadingIndicator 
                                    size={3}
                                />}
                            />
                            <TaskGroupIndicatorTag 
                                num={0}
                                color={'bg-theta-tasks-taskgroup-tags-atc'}
                                border={'border-theta-tasks-taskgroup-tags-atc-border'}
                                icon={<CartedIcon />}
                            />
                        </div>
                    </div>
                    
                    {/* Checkouts / Declines */}
                    <div className="flex flex-col justify-start items-end space-y-2">
                        <TaskGroupIndicatorTag 
                            num={0} 
                            color={'bg-theta-tasks-taskgroup-tags-checkout'}
                            border={'border-theta-tasks-taskgroup-tags-checkout-border'}
                            icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>}/>
                        <TaskGroupIndicatorTag 
                            num={0}
                            color={'bg-theta-tasks-taskgroup-tags-decline'}
                            border={'border-theta-tasks-taskgroup-tags-decline-border'}
                            icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>}/>
                        </div>
                </div>
            </button>
        </div>
    )
}

const Tasks = () => {

    const location = useLocation();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    // listens for route changes
    useEffect(() => {
        if (location.pathname === "/main/tasks") {
            setIsVisible(true)
        }
        else {
            setIsVisible(false)
        }
    }, [location]);


    const taskGroupsSelector : TaskGroupInterface[] = useSelector((state : RootState) => state.tasks.taskGroups)

    useEffect(() => {

        setTaskGroups(taskGroupsSelector.map(tg => tg.name))
        
        if (taskGroupsSelector.length > 0) {
            setSelectedTaskGroup(taskGroupsSelector[0].name)
        }

    }, [])

    // Used to deleting a task group on front end
    useEffect(() => {
        // setTaskGroups(taskGroupsSelector.map(t => t.name))
        // if (taskGroupsSelector.length !== 0 && taskGroupsSelector.findIndex(t => t.name === selectedTaskGroup) === -1) {
        //     setSelectedTaskGroup(taskGroupsSelector[0].name)
        // }
    }, [taskGroupsSelector.length])


    const [selectedTaskGroup, setSelectedTaskGroup] = useState<string>('');

    const [tgCount, setTgCount] = useState<number>(0);
    const [taskGroups, setTaskGroups] = useState<string[]>([]);

 
    const dispatch = useDispatch()

    const addTaskGroup = () => {

        let newTaskGroupName = "Task Group"
        let iter = 1;

        while (taskGroupsSelector.findIndex(taskGr => taskGr.name === newTaskGroupName + " " + iter) !== -1) {
            iter += 1;
        }

        setTaskGroups([...taskGroups, newTaskGroupName + " " + iter])
        setSelectedTaskGroup(newTaskGroupName + " " + iter)
        setTgCount(tgCount + 1)
        dispatch(saveTaskGroup({
            name: newTaskGroupName + " " + iter,
            site: undefined,
            tasks: [],
            delays: {
                error: 3000,
                monitor: 3000
        }}))
    }

    return (
        <div className={`w-full h-full ${isVisible ? 'flex' : 'hidden'} flex-row justify-start items-center`}>
            {/* Task groups */}
            <div className="w-72 h-full bg-theta-tasks-taskgroup flex flex-col justify-start items-center">
                {/* Header */}
                <div className="mt-2 p-2 w-full flex flex-row justify-center space-x-4 items-center text-theta-white">
                    <div className="w-fulltext-start text-2xl font-medium">
                        Task Groups
                    </div>
                    <TaskGroupIcon />
                </div>

                {/* Task Groups mapping */}
                <div className="w-full flex flex-col justify-start items-center space-y-2 overflow-y-scroll scrollbar-hide">
                    {taskGroups.map((tg) => {
                        return <TaskGroup 
                            taskGroups={taskGroups}
                            setTaskGroups={setTaskGroups}
                            setSelectedTaskGroup={setSelectedTaskGroup}
                            selectedTaskGroup={selectedTaskGroup}
                            name={tg}
                        />
                    })}

                    {/* Add TaskGroup */}
                    <div className="w-full h-auto px-2">
                        <button className="w-full h-16 focus:outline-none"
                        onClick={() => addTaskGroup()}
                        >
                            <div className="text-theta-tasks-taskgroup-text-3 transition transform duration-250 ease-in-out hover:scale-105 p-1 bg-theta-tasks-taskgroup-individual flex flex-row justify-center items-center border border-theta-tasks-taskgroup-border shadow-md rounded-md w-full h-full">
                                <AddTaskGroupIcon />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Rest of screen aka tasks*/}
            <TaskGroupInterfaceRenderer 
                taskGroups={taskGroups}
                selectedTaskGroup={selectedTaskGroup}
            />
        </div>
    )
}

export default Tasks;