import React, {
    FC, ReactNode
} from 'react'

interface ScreenWrapperModalProps {
    isEnabled: boolean,
    setIsEnabled: (b : boolean) => void,
    children: ReactNode
}

const ScreenWrapperModal : FC<ScreenWrapperModalProps> = ({
    isEnabled,
    setIsEnabled,
    children
} : ScreenWrapperModalProps) => {
    return (
        // This accounts for the 4 padding in ScreenWrapper
        <div className={`z-30 transition duration-250 ease-in-out ${isEnabled ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} z-40 absolute -top-4 -left-4 -right-4 -bottom-4 flex-col justify-center items-center`}>
            <div className={`z-20 flex flex-col justify-center items-center absolute top-0 right-0 left-0 bottom-0 `}
            onClick={() => setIsEnabled(false)}
            >
                {children}
            </div>
            <div className={`z-0 absolute flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-black opacity-20 ${isEnabled ? 'pointer-events-auto' : 'pointer-events-none'}`}
            ></div>
        </div>
    )
}

export default ScreenWrapperModal;