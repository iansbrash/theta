import React, {
    FC, ReactNode
} from 'react';

interface ScreenWrapperProps {
    children: ReactNode,
    hidden?: boolean
}

const ScreenWrapper : FC<ScreenWrapperProps> = ({
    children,
    hidden
}) => {
    return (
        <div className={`w-full h-full p-4 ${hidden ? 'hidden' : ''}`}>
            <div className="w-full h-full flex flex-col justify-start items-center">
                {children}
            </div>
        </div>
    )
}

export default ScreenWrapper;