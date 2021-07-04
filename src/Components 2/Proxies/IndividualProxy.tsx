import React, {
    FC,
} from 'react';
import { Proxy } from '../../Logic/interfaces/ProxyList';

const IndividualProxy : FC<Proxy> = ({
    ip,
    port,
    username,
    password
}) => {
    return (
        <div className="w-full h-10 my-0.5 px-2 bg-theta-bg rounded-md shadow-md flex flex-row justify-start items-center">
            <div className="text-theta-gray-2 text-xl w-6/12">
                {ip}
            </div>
            <div className="text-theta-gray-2 text-xl w-1/12">
                {port}
            </div>
            <div className="text-theta-gray-2 text-xl w-2/12">
                {username}
            </div>
            <div className="text-theta-gray-2 text-xl w-2/12">
                {password}
            </div>
            <div className="flex flex-row justify-end items-center space-x-2 w-1/12">
                <button className="h-8 w-8 p-1 rounded-md shadow-md bg-red-500 flex justify-center items-center text-theta-gray-2 focus:outline-none"
                onClick={() => null}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default IndividualProxy;