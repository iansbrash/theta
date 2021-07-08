import React, {
    FC, useState
} from 'react'
import IndividualProxy from './IndividualProxy'

interface AutoResizerProxyComponentProps {
    key: any,
    index: number,
    style: React.CSSProperties,
    parent: any
}

const AutoResizerProxyComponent : FC<AutoResizerProxyComponentProps> = (props) => {
    
    console.log(`autoResizerProps`)
    console.log(props)
    console.log(props.parent.props.data)

    return (
        <div className="block" style={props.style}>
            <IndividualProxy 
            {...(props.parent.props.data[props.index])}
            />
            <div className="h-4"></div>
        </div>
        
    )
}

export default AutoResizerProxyComponent;