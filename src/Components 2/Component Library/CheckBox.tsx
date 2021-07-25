import { check } from 'prettier';
import React, {
    FC, useState
} from 'react';

interface CheckBoxProps {
    checked: boolean,
    setChecked: (b : boolean) => void,
    widthheight: string,
    bgUnchecked: string,
    bgChecked: string,
    checkColorChecked: string
    checkColorUnchecked: string,
    borderColor?: string
}

const CheckBox : FC<CheckBoxProps> = ({
    checked,
    setChecked,
    widthheight,
    bgUnchecked,
    bgChecked,
    checkColorChecked,
    checkColorUnchecked,
    borderColor
} : CheckBoxProps) => {
    return (
        <button className={`focus:outline-none ${widthheight} ${checked ? bgChecked : bgUnchecked} ${checked ? checkColorChecked : checkColorUnchecked} ${borderColor ? `border ${borderColor}` : null} rounded-md shadow-md flex justify-center items-center`}
        onClick={() => setChecked(!checked)}
        >
            {checked ? <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg> : null}
        </button>
    )
}

export default CheckBox;