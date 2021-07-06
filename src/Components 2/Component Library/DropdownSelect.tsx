import React, {
    FC,
    useState
} from 'react';

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
)

interface DrowndownSelectProps {
    setSelection: (s : string) => void,
    selectionArray: string[],
    bg: string,
    textSize?: string,
    placeholder: string
}

const DropdownSelect : FC<DrowndownSelectProps> = ({
    setSelection,
    selectionArray,
    bg,
    textSize,
    placeholder
} : DrowndownSelectProps) => {

    const [selectSearchInput, setSelectSearchInput] = useState<string>('');
    const [dropdownDown, setDropdownDown] = useState<boolean>(false);

    const handleSiteChange = (s : string) => {
        setSelection(s);
        setSelectSearchInput(s);
        onInputBlur();
    }

    const onInputFocus = () => {
        setDropdownDown(true)
    }
    const onInputBlur = () => {
        setDropdownDown(false)
    }


    return (
        <div className="h-full w-full flex flex-col">
            {/* Input part */}
            <button className={`border-t border-l border-r border-theta-gray-7 relative focus:outline-none w-full h-full rounded-t-lg ${dropdownDown ? '' : 'rounded-b-lg border-b'} shadow-md ${bg} flex flex-col justify-start items-center`}
            onClick={() => null}
            >
                <div className="h-full flex flex-row justify-start items-center">
                    <div className="w-7"></div>
                    <input
                        value={selectSearchInput}
                        onChange={(e) => setSelectSearchInput(e.target.value)}
                        onFocus={() => onInputFocus()}
                        // onBlur={() => onInputBlur()}
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
                <div className={`${dropdownDown ? '' : 'hidden'} border-b border-l border-r border-theta-gray-7 rounded-bl-lg rounded-br-lg ${bg} absolute top-0 left-0 right-0 flex flex-col justify-start items-center`}
                onBlur={() => onInputBlur()}
                >
                    
                    {selectionArray.filter(s => s.toLowerCase().includes(selectSearchInput.toLowerCase())).map(site => (
                        <SelectOption 
                            name={site}
                            handleSelectChange={handleSiteChange}
                            textSize={textSize}
                        />
                    ))}
                    {/* Adding this adds the ones that don't match the criteria below */}
                    {selectionArray.filter(s => !s.toLowerCase().includes(selectSearchInput.toLowerCase())).map(site => (
                        <SelectOption 
                            name={site}
                            handleSelectChange={handleSiteChange}
                            textSize={textSize}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface SelectOptionProps {
    name: string,
    handleSelectChange: (s : string) => void,
    textSize?: string
}

const SelectOption : FC<SelectOptionProps> = ({
    name,
    handleSelectChange,
    textSize
} : SelectOptionProps) => {
    return (
        <button className={`"relative text-theta-gray-7 hover:text-theta-gray-2 focus:outline-none transition flex flex-row justify-start items-center w-full ${textSize === 'text-xl' ? 'h-8' : 'h-10'}`}
            onClick={() => handleSelectChange(name)}
        >   
            {/* This is w-8 because we have a space in front of the placeholder in the input */}
            <div className="w-7"></div>
            <div className={`${textSize ? textSize : 'text-2xl'}`}>
                {name}
            </div>
        </button>
    )
}

export default DropdownSelect;