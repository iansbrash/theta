import React, {
    useState,
    FC
} from 'react';

interface IndividualProfileProps {
    name: string,
    selectedProfile: string,
    setSelectedProfile: (s : string) => void,
    bg?: string
}

const IndividualProfile : FC<IndividualProfileProps> = ({
    name,
    selectedProfile,
    setSelectedProfile,
    bg
} : IndividualProfileProps) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    return (
        <button className={`transition duration-250 ease-in-out focus:outline-none w-full h-14 ${selectedProfile === name ? 'bg-theta-profiles-individual-selected' : (bg ? bg : 'bg-theta-profiles-individual')} rounded-md shadow-md border ${selectedProfile === name ? 'border-theta-gray-2' : 'border-theta-tasks-taskgroup'} flex flex-row justify-between items-center`}
        onClick={() => setSelectedProfile(name)}
        >
            {/* Left Side */}
            <div className="h-14 flex flex-row justify-start items-center">
                <div className=" w-10 h-10 rounded-md shadow-md bg-theta-bg ml-2"></div>
                <div className={`font-medium ${selectedProfile === name ? 'text-theta-gray-2' : 'text-theta-gray-7'} text-xl ml-2`}>
                    {name}
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
                {/* <button className="text-theta-gray-2 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button> */}
                {/* <button className="text-red-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button> */}
            </div>
        </button>
    )
}

export default IndividualProfile;