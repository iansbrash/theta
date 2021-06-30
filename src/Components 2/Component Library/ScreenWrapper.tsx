import React, {
    FC,
} from 'react';


const ScreenWrapper : FC = ({
    children
}) => {
    return (
        <div className="w-full h-full p-4">
            <div className="w-full h-full flex flex-col justify-start items-center">
                {children}
            </div>
        </div>
    )
}

export default ScreenWrapper;