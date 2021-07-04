import React, {
    FC, useState
} from 'react'
import IndividualProxy from './IndividualProxy'

interface AutoResizerProxyComponentProps {
    key: any,
    index: number,
    style: React.CSSProperties
}

const AutoResizerProxyComponent : FC<AutoResizerProxyComponentProps> = ({key, index, style} : AutoResizerProxyComponentProps) => {

    const proxy = {
        ip: '123.5234.123.693',
        port: 90007,
        username: 'iamstupidiong',
        password: 'tjheta123'
    }

    return (
        <div className="block" style={style}>
            <IndividualProxy 
            {...proxy}
            />
            <div className="h-4"></div>
        </div>
        
    )
}

export default AutoResizerProxyComponent;