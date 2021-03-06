import React, {
    useState,
    FC,
    useEffect
} from 'react';
import electron from 'electron';
import ProfileObject from '../../Logic/interfaces/ProfileObject';

interface IndividualProfileProps {
    item: any, // ProfileObject
    selectedItem: any,
    setSelectedItem: (a : any) => void,
    bg?: string,
    itemToString: (a : any) => string,
    comparator?: (a1 : any, a2: any) => boolean
}

const IndividualProfile : FC<IndividualProfileProps> = ({
    item,
    selectedItem,
    setSelectedItem,
    bg,
    itemToString,
    comparator
} : IndividualProfileProps) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const toggleFavorite = async () => {
        setIsFavorite(!isFavorite)

        // update redux and writejson
        // let res = await electron.ipcRenderer.invoke('readjson', 'profiles.json')
        // let ind = res.findIndex((pro : ProfileObject) => pro.information.name === itemToString(item));
        // if (ind !== -1) {
        //     res[ind].settings.favorite = !isFavorite;
        //     await electron.ipcRenderer.invoke('writejson', 'profiles.json', res)
        // } 
        // else {
        //     throw "Profile does not exist"
        // }
    }

    const [isSelected, setIsSelected] = useState(comparator ? comparator(selectedItem, item) : selectedItem === item);

    useEffect(() => {
        setIsSelected(comparator ? comparator(selectedItem, item) : selectedItem === item)
    }, [selectedItem])

    return (
        <button className={`transition duration-250 ease-in-out focus:outline-none w-full h-14 ${isSelected ? 'bg-theta-profiles-individual-selected' : (bg ? bg : 'bg-theta-profiles-individual')} rounded-md shadow-md border ${isSelected ? 'border-theta-gray-2' : 'border-theta-tasks-taskgroup'} flex flex-row justify-between items-center`}
        onClick={() => setSelectedItem(item)}
        >
            {/* Left Side */}
            <div className="h-14 flex flex-row justify-start items-center">
                <div className=" w-10 h-10 rounded-md shadow-md bg-theta-bg ml-2"></div>
                <div className={`font-medium ${isSelected ? 'text-theta-gray-2' : 'text-theta-gray-7'} text-xl ml-2`}>
                    {itemToString(item)}
                </div>
            </div>

            {/* Right Side */}
            <div className="w-auto justify-end flex flex-row items-center space-x-2 mr-3">
                <button className={ `${isFavorite ? `text-theta-logo` : 'text-gray-500'} focus:outline-none`}
                onClick={() => toggleFavorite()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </button>
    )
}

export default IndividualProfile;