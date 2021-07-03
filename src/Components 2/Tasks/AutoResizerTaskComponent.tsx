import React, {
    FC, useState
} from 'react'
import Site from '../../Logic/interfaces/enums/Site'
import Size from '../../Logic/interfaces/enums/Size'
import { AmazonModes } from '../../Logic/interfaces/site_task_config/AmazonTaskConfig'
import testAccount from '../../Logic/sensitive/testInterfaces/testAccount'
import testProfile from '../../Logic/sensitive/testInterfaces/testProfile'
import testProxyList from '../../Logic/sensitive/testInterfaces/testProxyList'
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass'
import TaskClass from '../../Logic/sites/classes/TaskClass'
import TaskComponent from './TaskComponent'

interface AutoResizerTaskComponentProps {
    key: any,
    index: number,
    style: React.CSSProperties
}

const AutoResizerTaskComponent : FC<AutoResizerTaskComponentProps> = ({key, index, style} : AutoResizerTaskComponentProps) => {

    const testTask : TaskClass = new AmazonTaskClass(
        1, 
        Site.Amazon, 
        testProfile, 
        [Size.OS], 
        testProxyList, 
        'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/',
        {
            mode: AmazonModes.Normal,
            account: testAccount
        }
    )

    return (
        <div className="block" style={style}>
            <TaskComponent 
            task={testTask}
            />
            <div className="h-4"></div>
        </div>
        
    )
}

export default AutoResizerTaskComponent;