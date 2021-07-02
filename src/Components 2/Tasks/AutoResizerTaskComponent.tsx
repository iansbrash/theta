import React, {
    FC, useState
} from 'react'
import TaskComponent from './TaskComponent'

interface AutoResizerTaskComponentProps {
    key: any,
    index: number,
    style: React.CSSProperties
}

const AutoResizerTaskComponent : FC<AutoResizerTaskComponentProps> = ({key, index, style} : AutoResizerTaskComponentProps) => {
    return (
        <div className="block" style={style}>
            <TaskComponent />
            <div className="h-4"></div>
        </div>
        
    )
}

export default AutoResizerTaskComponent;