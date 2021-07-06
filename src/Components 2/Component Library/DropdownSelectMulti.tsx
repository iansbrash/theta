import React, {
    FC,
    useState,
    useEffect,
    useRef,
} from 'react';

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
)


interface DrowndownSelectMultiProps {
    selection: any[],
    setSelection: (s : any[]) => void,
    selectionArray: any[],
    bg: string,
    textSize?: string,
    placeholder: string,
    itemToString: (a : any) => string,
}

const DropdownSelectMulti : FC<DrowndownSelectMultiProps> = ({
    setSelection,
    selectionArray,
    bg,
    textSize,
    selection,
    placeholder,
    itemToString,
} : DrowndownSelectMultiProps) => {

    const [selectSearchInput, setSelectSearchInput] = useState<string>('');
    const [dropdownDown, setDropdownDown] = useState<boolean>(false);

    
    const relativeRef = useRef<HTMLDivElement>(null);



    const handleSelectionChange = (a : any, needsRemove : boolean) => {

        if (needsRemove) {
            setSelection(selection.filter(sel => sel !== a))
        }
        else {
            setSelection([...selection, a]);
        }
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
        selectionArray = [...selectionArray]
        
        document.addEventListener('mousedown', handleMDown)

        return () => {
            document.removeEventListener('mousedown', handleMDown)
        }
    }, [])

    const resetSelection = () => {
        setSelection([])
    }



    return (
        <div className="h-full w-full flex flex-col"
        onClick={() => console.log('oinclick')}
        onFocus={() => console.log('focus in outder div')}
        ref={relativeRef}
        >
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
                        placeholder={placeholder}
                        className={`rounded-r-xl h-full w-full ${bg} focus:outline-none placeholder-theta-gray-2 text-theta-gray-2 ${textSize ? textSize : 'text-2xl'}`}
                    />
                </div>
                <div className="text-theta-gray-7 absolute left-0 top-0 bottom-0 flex justify-center items-center">
                    <ChevronRight />
                </div>

                <button className="focus:outline-none absolute right-1 top-0 bottom-0 flex justify-center items-center text-theta-gray-7"
                onClick={() => resetSelection()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </button>

            {/* Drop down part */}
            <div className="relative w-full" 
            >
                <div className={`${dropdownDown ? '' : 'hidden'} focus:outline-none border-b border-l border-r border-theta-gray-7 rounded-bl-lg rounded-br-lg ${bg} h-auto w-full absolute top-0 left-0 right-0 flex flex-col justify-start items-center`}
                >
                    {selectionArray.filter(i => itemToString(i).toLowerCase().includes(selectSearchInput.toLowerCase())).map(item => (
                        <SelectOption 
                            item={item}
                            handleSelectChange={handleSelectionChange}
                            textSize={textSize}
                            selection={selection}
                            key={item}
                            itemToString={itemToString}
                        />
                    ))}
                    {/* Adding this adds the ones that don't match the criteria below */}
                    {selectionArray.filter(i => !itemToString(i).toLowerCase().includes(selectSearchInput.toLowerCase())).map(item => (
                        <SelectOption 
                            item={item}
                            handleSelectChange={handleSelectionChange}
                            textSize={textSize}
                            selection={selection}
                            key={item}
                            itemToString={itemToString}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const SelectedCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)

interface SelectOptionProps {
    item: any,
    handleSelectChange: (a : any, b : boolean) => void,
    textSize?: string,
    selection: any[],
    itemToString: (a : any) => string
}

const SelectOption : FC<SelectOptionProps> = ({
    item,
    handleSelectChange,
    textSize,
    selection,
    itemToString
} : SelectOptionProps) => {



    const [isSelected, setIsSelected] = useState<boolean>(selection.includes(item));

    useEffect(() => {
        setIsSelected(selection.includes(item))
    }, [selection])

    const bundleSelectChange = () => {
        handleSelectChange(item, isSelected)
        setIsSelected(!isSelected)
    }

    return (
        <button className={`"relative text-theta-gray-7 hover:text-theta-gray-2 focus:outline-none transition flex flex-row justify-start items-center w-full ${textSize === 'text-xl' ? 'h-8' : 'h-10'}`}
            onClick={() => bundleSelectChange()}
        >   
            {/* This is w-8 because we have a space in front of the placeholder in the input */}
            <div className="w-7 text-theta-gray-2">
                {isSelected ? <SelectedCheck /> : null}
            </div>
            <div className={`${textSize ? textSize : 'text-2xl'} ${isSelected ? 'text-theta-gray-2' : ''}`}>
                {itemToString(item)}
            </div>
        </button>
    )
}

export default DropdownSelectMulti;