import React, {
    useState,
    FC
} from 'react';

interface IndividualProfileProps {
    item: any,
    selectedItem: any,
    setSelectedItem: (a : any) => void,
    bg?: string,
    itemToString: (a : any) => string
}

const IndividualProfile : FC<IndividualProfileProps> = ({
    item,
    selectedItem,
    setSelectedItem,
    bg,
    itemToString
} : IndividualProfileProps) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    return (
        <button className={`transition duration-250 ease-in-out focus:outline-none w-full h-14 ${selectedItem === item ? 'bg-theta-profiles-individual-selected' : (bg ? bg : 'bg-theta-profiles-individual')} rounded-md shadow-md border ${selectedItem === item ? 'border-theta-gray-2' : 'border-theta-tasks-taskgroup'} flex flex-row justify-between items-center`}
        onClick={() => setSelectedItem(item)}
        >
            {/* Left Side */}
            <div className="h-14 flex flex-row justify-start items-center">
                <div className=" w-10 h-10 rounded-md shadow-md bg-theta-bg ml-2"></div>
                <div className={`font-medium ${selectedItem === item ? 'text-theta-gray-2' : 'text-theta-gray-7'} text-xl ml-2`}>
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