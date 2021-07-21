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

    // const data : TaskHookProps = props.parent.props.data[props.index]
    let data : TaskClass = props.parent.props.data[props.index];
    // (data as AmazonTaskClass).config.account = testAccount;

    return (
        <div className="block" style={props.style} key={data.identifier}>
            <TaskComponent 
                task={data}
                tasks2={props.parent.props.data}
                tasks={props.parent.props.data5}
                setTasks2={props.parent.props.data2}
                setTasks={props.parent.props.data4}
                tgName={props.parent.props.data3}
            />
            <div className="h-4"></div>
        </div>
        
    )
}

export default AutoResizerTaskComponent;