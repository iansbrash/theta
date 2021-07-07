import React, { FC, ReactNode } from 'react';


interface MultiLineTextInputProps {
    placeholder: string,
    icon?: ReactNode,
    input: string,
    onChange: (s : string) => void,
    bg: string,
    border?: string,
    textSize?: string,
    offsetWidth?: string
}

const MultiLineTextInput : FC<MultiLineTextInputProps> = ({
    placeholder,
    icon,
    input,
    onChange,
    bg,
    border,
    textSize,
    offsetWidth
}: MultiLineTextInputProps) => {


    return (
        <div className={`${border ? `border ${border}` : null} ${bg} transition duration-250 ease-in-out hover:border-theta-logo relative w-full h-full rounded-lg bg-transparent flex flex-row justify-start items-center`}
        onClick={() => null}
        >
            <div className="h-full flex flex-row justify-start items-center w-full">
                {icon ? <div className={`${offsetWidth ? offsetWidth : 'w-6'}`}></div> : null}
                <textarea
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`${bg} scrollbar-hide resize-none p-1 rounded-lg h-full w-full bg-transparent focus:outline-none placeholder-theta-gray-7 text-theta-gray-2 ${textSize ? textSize : 'text-xl'}`}
                />
            </div>
            <div className="text-theta-gray-7 absolute left-1 top-0 bottom-0 flex justify-center items-center">
                {icon}
            </div>
        </div>
    ) 
}

export default MultiLineTextInput;