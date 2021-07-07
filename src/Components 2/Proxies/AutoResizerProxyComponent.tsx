import React, {
    FC, useState
} from 'react'
import IndividualProxy from './IndividualProxy'

interface AutoResizerProxyComponentProps {
    key: any,
    index: number,
    style: React.CSSProperties,
    data?: any,
    itemData?: any,
    parent: any
}

const AutoResizerProxyComponent : FC<AutoResizerProxyComponentProps> = (props) => {
    
    console.log(`autoResizerProps`)
    console.log(props)
    console.log(props.parent.props.data)

    const proxy = {
        ip: '123.5234.123.693',
        port: 90007,
        username: 'iamstupidiong',
        password: 'tjheta123'
    }

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