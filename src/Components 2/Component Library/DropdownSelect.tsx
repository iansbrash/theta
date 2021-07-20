import React, {
    FC,
    useState,
    useEffect,
    useRef
} from 'react';

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
)

interface DrowndownSelectProps {
    selection: any,
    setSelection: (s : any) => void,
    selectionArray: any[],
    bg: string,
    textSize?: string,
    placeholder: string,
    itemToString: (a : any) => string,
    offsetWidth?: string,
    maxRowsBeforeOverflow?: number,
    border?: string,
    noShadow?: boolean,
    transformBack?: boolean
}

const DropdownSelect : FC<DrowndownSelectProps> = ({
    selection,
    setSelection,
    selectionArray,
    bg,
    textSize,
    placeholder,
    itemToString,
    offsetWidth,
    maxRowsBeforeOverflow,
    border,
    noShadow,
    transformBack
} : DrowndownSelectProps) => {

    const [selectSearchInput, setSelectSearchInput] = useState<string>(selection ? itemToString(selection) : '');
    const [dropdownDown, setDropdownDown] = useState<boolean>(false);

    const relativeRef = useRef<HTMLDivElement>(null);


    const handleSiteChange = (a : any) => {
        setSelection(transformBack ? itemToString(a) : a);
        setSelectSearchInput(itemToString(a));
        onInputBlur();
    }

    const onInputFocus = () => {
        setDropdownDown(true)
    }
    const onInputBlur = () => {
        setDropdownDown(false)
    }

    const handleMDown = (event : Event) => {
        // @ts-ignore
        if (relativeRef.current.contains(event.target)) {
            // console.log("Clicked Inside");
        } else {
            setDropdownDown(false)
        }
    }


    useEffect(() => {
        
        document.addEventListener('mousedown', handleMDown)

        return () => {
            document.removeEventListener('mousedown', handleMDown)
        }
    }, [])


    return (
        <div className="h-full w-full flex flex-col"
        ref={relativeRef}
        >
            {/* Input part */}
            <button className={`border-t border-l border-r ${border ? border : 'border-theta-gray-7'} relative focus:outline-none w-full h-full rounded-t-lg ${dropdownDown ? '' : 'rounded-b-lg border-b'} ${noShadow ? '' : 'shadow-md'} ${bg} flex flex-col justify-start items-center`}
            onClick={() => null}
            >
                <div className="h-full flex flex-row justify-start items-center w-full">
                    <div className={offsetWidth ? offsetWidth : 'w-7'}></div>
                    <input
                        value={selectSearchInput}
                        onChange={(e) => setSelectSearchInput(e.target.value)}
                        onFocus={() => onInputFocus()}
                        placeholder={placeholder}
                        className={`rounded-r-xl h-full w-full ${bg} focus:outline-none placeholder-theta-gray-2 text-theta-gray-2 ${textSize ? textSize : 'text-2xl'}`}
                    />
                </div>
                <div className="text-theta-gray-7 absolute left-0 top-0 bottom-0 flex justify-center items-center">
                    <ChevronRight />
                </div>
            </button>

            {/* Drop down part */}
            <div className="relative w-full" 
            >
                <div className={`${dropdownDown ? '' : 'hidden'} focus:outline-none border-b border-l border-r ${border ? border : 'border-theta-gray-7'} rounded-bl-lg rounded-br-lg ${bg} ${maxRowsBeforeOverflow ? `max-h-${maxRowsBeforeOverflow * 10} scrollbar-hide overflow-y-scroll` : 'h-auto'} w-full absolute top-0 left-0 right-0 flex flex-col justify-start items-center`}
                >
                    
                    {selectionArray.filter(i => itemToString(i).toLowerCase().includes(selectSearchInput.toLowerCase())).map(item => (
                        <SelectOption 
                            item={item}
                            handleSelectChange={handleSiteChange}
                            textSize={textSize}
                            itemToString={itemToString}
                            key={itemToString(item)}
                        />
                    ))}
                    {/* Adding this adds the ones that don't match the criteria below */}
                    {selectionArray.filter(i => !itemToString(i).toLowerCase().includes(selectSearchInput.toLowerCase())).map(item => (
                        <SelectOption 
                            item={item}
                            handleSelectChange={handleSiteChange}
                            textSize={textSize}
                            itemToString={itemToString}
                            key={itemToString(item)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface SelectOptionProps {
    item: any,
    handleSelectChange: (s : any) => void,
    textSize?: string,
    itemToString: (i : any) => string
}

const SelectOption : FC<SelectOptionProps> = ({
    item,
    handleSelectChange,
    textSize,
    itemToString
} : SelectOptionProps) => {

    return ( 
        <button className={`"relative text-theta-gray-7 hover:text-theta-gray-2 focus:outline-none transition flex flex-row justify-start items-center w-full ${textSize === 'text-xl' ? 'h-8' : 'h-10'}`}
            onClick={() => handleSelectChange(item)}
        >
            {/* This is w-8 because we have a space in front of the placeholder in the input */}
            <div className={`${textSize === 'text-xl' ? 'h-8' : 'h-10'} w-7`}></div>
            <div className={`${textSize ? textSize : 'text-2xl'}`}>
                {itemToString(item)}
            </div>
        </button>
    )
}

export default DropdownSelect;