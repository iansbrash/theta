import React, { 
    FC, useState
} from "react";



interface AbstractSelectorProps {
    defaultText: string,
    selection: string,
    setSelection: (x : string) => void,
    selectionOptions: string[]
}

const AbstractSelector : FC<AbstractSelectorProps> = ({
    defaultText,
    selection,
    setSelection,
    selectionOptions
} : AbstractSelectorProps) => {

    
    const handleChange = (e : any) => {
        if (e.target.value === 'Select Site'){
            // setField('');
        }
        else {
            // setField(e.target.value);
        }
        setSelection(e.target.value)
    }


    return (
        <div className="w-full flex justify-start p-5">
            <select value={selection} onChange={(e) => handleChange(e)} className={`${selection === defaultText ? 'text-indigo-400' : 'text-indigo-100'} w-52 text-2xl mt-2 p-1 rounded-md appearance-none bg-indigo-975 focus:outline-none`}>
                <option className="text-indigo-400" value={defaultText}>{defaultText}</option>
                {selectionOptions.map(item => <option className="text-indigo-100" value={item}>{item}</option>)}
            </select>
        </div>
    )
}

const AddTasks : FC = () => {

    const [site, setSite] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [profile, setProfile] = useState<string>('');
    const [proxies, setProxies] = useState<string>('');

  


    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    {/* Add Tasks text */}
                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Create tasks
                    </div>

                    {/* Site selector */}
                    <AbstractSelector 
                        defaultText={'Select Site'}
                        selection={site}
                        setSelection={setSite}
                        selectionOptions={['Amazon']}
                    />


                    <div className="h-full flex flex-row w-full p-1 grid-cols-2 mb-4">
                        {/* Col1 */}
                        <div className="w-1/2 flex flex-col">
                            {/* Size selector */}
                            <AbstractSelector 
                                defaultText={'Select Size'}
                                selection={size}
                                setSelection={setSize}
                                selectionOptions={['OS', 'Random', 'S', 'M', 'L', 'XL']}
                            />
                            {/* Proxies selector */}
                            <AbstractSelector 
                                defaultText={'Select Proxies'}
                                selection={proxies}
                                setSelection={setProxies}
                                selectionOptions={['List1', 'List2']}
                            />
                        </div>

                        {/* Col2 */}
                        <div className="w-1/2 flex flex-col">
                            {/* Profile selector */}
                            <AbstractSelector 
                                defaultText={'Select Profile'}
                                selection={profile}
                                setSelection={setProfile}
                                selectionOptions={['Profile 1', 'Real Card', 'Mom Card']}
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


// store selector
// options for store pop up on select
// default options:
//      size, profile, proxies, url/input
// amazon option:
//      account, mode

export default AddTasks;