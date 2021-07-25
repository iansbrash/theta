import React, { FC, ReactNode } from 'react';


interface TextInputProps {
    placeholder: string,
    icon?: ReactNode,
    input: string,
    onChange: (s : string) => void,
    bg: string,
    border?: string,
    textSize?: string,
    offsetWidth?: string,
    onClick?: () => void,
    disabled?: boolean,
}

const TextInput : FC<TextInputProps> = ({
    placeholder,
    icon,
    input,
    onChange,
    bg,
    border,
    textSize,
    offsetWidth,
    onClick,
    disabled,
}: TextInputProps) => {

    if (disabled) {
        return (
            <div className={`${border ? `border ${border}` : null} ${'bg-theta-sidebar'} relative w-full h-full rounded-lg flex flex-row justify-start items-center`}
            onClick={() => null}
            >
                <div className="h-full flex flex-row justify-start items-center w-full">
                    {icon ? <div className={`${offsetWidth ? offsetWidth : 'w-6'}`}></div> : null}
                    <input
                        readOnly={disabled ? true : false}
                        value={input}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className={`ml-1 rounded-lg h-full w-full bg-transparent focus:outline-none placeholder-theta-gray-7 text-theta-gray-7 ${textSize ? textSize : 'text-xl'}`}
                    />
                </div> 
                <div className="focus:outline-none text-theta-gray-7 absolute left-1 top-0 bottom-0 flex justify-center items-center">
                    {icon}
                </div>
            </div> 
        )
    }

    return (
        <div className={`${border ? `border ${border}` : null} ${bg} transition duration-250 ease-in-out hover:border-theta-logo relative w-full h-full rounded-lg bg-transparent flex flex-row justify-start items-center`}
        onClick={() => null}
        >
            <div className="h-full flex flex-row justify-start items-center w-full">
                {icon ? <div className={`${offsetWidth ? offsetWidth : 'w-6'}`}></div> : null}
                <input
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`ml-1 ${bg} rounded-lg h-full w-full bg-transparent focus:outline-none placeholder-theta-gray-7 text-theta-gray-2 ${textSize ? textSize : 'text-xl'}`}
                />
            </div>
            <button className="focus:outline-none text-theta-gray-7 absolute left-1 top-0 bottom-0 flex justify-center items-center"
            onClick={() => onClick ? onClick() : null}
            >
                {icon}
            </button>
        </div>
    ) 
}

export default TextInput;