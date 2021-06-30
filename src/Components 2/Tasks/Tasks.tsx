import React, {
    FC, useState
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';

const TaskGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
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
        <div className={`px-1 font-medium text-theta-white text-sm ${color} shadow-sm rounded-sm flex flex-row justify-start items-center border ${border}`}>
            <div className="mr-1">
                {num}
            </div>
            {icon}
        </div>
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
    name: string
}

const TaskGroup : FC<TaskGroupProps> = ({
    name
} : TaskGroupProps) => {
    return (
        <div className="w-full h-16 px-2">
            <div className="p-1 flex flex-col justify-between items-start border border-theta-tasks-taskgroup-border shadow-md rounded-md w-full h-full">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="px-1 font-medium text-theta-tasks-taskgroup-text-3">
                        {name}
                    </div>
                </div>

                {/* Icons for tasks */}
                <div className="flex flex-row justify-start items-center space-x-2">
                    <TaskGroupIndicatorTag 
                        num={314}
                        color={'bg-theta-tasks-taskgroup-tags-idle'}
                        border={'border-theta-tasks-taskgroup-tags-idle-border'}
                        icon={<LoadingIndicator 
                            size={3}
                        />}
                    />
                    <TaskGroupIndicatorTag 
                        num={23}
                        color={'bg-theta-tasks-taskgroup-tags-checkout'}
                        border={'border-theta-tasks-taskgroup-tags-checkout-border'}
                        icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>}/>
                    <TaskGroupIndicatorTag 
                        num={4}
                        color={'bg-theta-tasks-taskgroup-tags-decline'}
                        border={'border-theta-tasks-taskgroup-tags-decline-border'}
                        icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>}/>
                </div>
            </div>
        </div>
    )
}

const Tasks = () => {
    return (
        <div className="w-full h-full flex flex-row justify-start items-center">
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
                <div className="w-full flex flex-col justify-start items-center space-y-2">
                    {[1, 2, 3, 4, 5].map(tg => (
                        <TaskGroup 
                            name={`Task group ${tg}`}
                        />
                    ))}
                </div>
            </div>

            {/* Rest of screen */}
            <ScreenWrapper>

            </ScreenWrapper>
        </div>
    )
}

export default Tasks;