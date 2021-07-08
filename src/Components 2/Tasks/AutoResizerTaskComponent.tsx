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
import { TaskHookProps } from './TaskGroupInterface'

// interface AutoResizerTaskComponentProps {
//     key: any,
//     index: number,
//     style: React.CSSProperties,
// }

interface AutoResizerTaskComponentProps {
    key: any,
    index: number,
    style: React.CSSProperties,
    parent: any
}

const AutoResizerTaskComponent : FC<AutoResizerTaskComponentProps> = (props) => {

    const data : TaskHookProps = props.parent.props.data[props.index]

    const {
        taskConfig,
        siteConfig
    } = data;

    const {
        identifier,
        site,
        size,
        profile,
        proxies,
        input
    } = taskConfig

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

    const task : TaskClass = new AmazonTaskClass(
        identifier, 
        site, 
        profile, 
        size, 
        proxies, 
        input,
        siteConfig
    )
// pass the task array through props.parent.props.data
// should pass the config instead, rather than the task itself
    return (
        <div className="block" style={props.style}>
            <TaskComponent 
            task={task}
            />
            <div className="h-4"></div>
        </div>
        
    )
}

export default AutoResizerTaskComponent;