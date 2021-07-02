import TaskGroupInterface from "./TaskGroupInterface";
import React, {
    FC,
    useState
} from 'react';

interface TaskGroupInterfaceRendererProps {
    taskGroups: string[],
    selectedTaskGroup: string
}

const TaskGroupInterfaceRenderer : FC<TaskGroupInterfaceRendererProps> = ({
    taskGroups,
    selectedTaskGroup
} : TaskGroupInterfaceRendererProps) => {

    if (taskGroups.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="text-4xl font-medium text-theta-gray-7">
                    Add a task group 😊
                </div>
            </div>
        )
    }

    return (
        <>{
            taskGroups.map(tg => (
                <TaskGroupInterface hidden={tg !== selectedTaskGroup} taskGroupName={tg}/>
            ))
        }</>
    )
}

export default TaskGroupInterfaceRenderer;