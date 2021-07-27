import React, {
    FC, useState
} from 'react';
import Site from '../../Logic/interfaces/enums/Site';
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass';
import AmazonAddTasksModal from './AmazonAddTasksModal';
import { TaskHookProps } from './TaskGroupInterface';

interface AddTasksModalRendererProps {
    selectedSite: Site,
    addTasksEnabled: boolean,
    setAddTasksEnabled: (b : boolean) => void,
    tasks: TaskHookProps[],
    setTasks: (t : TaskHookProps[]) => void,
    tasks2: AmazonTaskClass[],
    setTasks2: (t : AmazonTaskClass[]) => void,
    errorDelay: number,
    monitorDelay: number,
    taskGroupName: string
}

const AddTasksModalRenderer  : FC<AddTasksModalRendererProps> = ({
    selectedSite,
    addTasksEnabled,
    setAddTasksEnabled,
    tasks,
    setTasks,
    tasks2,
    setTasks2,
    errorDelay,
    monitorDelay,
    taskGroupName
} : AddTasksModalRendererProps) => {

    switch (selectedSite) {
        case Site.Amazon:
            return (
                <AmazonAddTasksModal 
                    addTasksEnabled={addTasksEnabled}
                    setAddTasksEnabled={setAddTasksEnabled}
                    tasks={tasks}
                    setTasks={setTasks}
                    tasks2={tasks2}
                    setTasks2={setTasks2}
                    errorDelay={errorDelay}
                    monitorDelay={monitorDelay}
                    taskGroupName={taskGroupName}
                />
                )
        default:
            return <></>
    }
}

export default AddTasksModalRenderer;