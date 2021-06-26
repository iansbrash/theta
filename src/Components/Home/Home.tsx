import React, { FC } from "react";


const Checkout = () => {
    return (
        <div className="w-full p-2">
            <div className="flex flex-row justify-start w-full rounded-lg bg-indigo-900 shadow-lg h-16">
                {/* Icon */}
                <div className="w-16 h-16 p-1.5">
                    <div className="rounded-md w-full h-full bg-indigo-300">
                        <img src={'https://images-na.ssl-images-amazon.com/images/I/61JbCra%2B7GL._SX342_.jpg'} className="rounded-md"/>
                    </div>
                </div>
                {/* Text */}
                <div className="mx-1 flex flex-col leading-5 justify-center items-left">
                    <div className="text-indigo-100 font-medium">
                        Playstation 5 Digital Edition
                    </div>
                    <div className="text-indigo-300">
                        Amazon • <span className="text-indigo-100">$399</span>
                    </div>
                    <div className="text-indigo-500 text-sm">
                        6/25/2021
                    </div>
                </div>
                {/* Price */}
                <div className="flex-1 w-full flex justify-end items-center">
                    <button className="text-indigo-300 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

const Home : FC = () => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-gradient-to-l from-indigo-1000 to-indigo-975">
            {/* Top Header */}
            <div className="z-10 w-full mt-4">
                <div className="w-full flex justify-start flex-col text-left font-bold text-indigo-100">
                    <div className="mx-5 text-2xl">
                        Welcome back, 
                    </div>
                    <div className="mx-5 h-12 text-4xl bg-clip-text text-transparent bg-gradient-to-b from-indigo-800 to-indigo-500 ">
                        WholeDayBusy
                    </div>
                </div>

                <div className="w-full flex justify-start">
                    <div className="h-0.5 w-1/2 bg-gradient-to-r from-indigo-500 to-indigo-1000 mx-5 my-2">

                    </div>
                </div>
            </div>

            <div className="w-full px-5 pb-3 m-2 h-full flex flex-col">
                <div className="w-full bg-indigo-950 rounded-xl shadow-xl h-full shadow-lg flex flex-col justify-start items-center">
                    {[1, 2, 3, 4].map((n : number) => <Checkout />)}
                </div>
            </div>

            {/* Checkouts */}
            {/* <div className="h-full flex flex-row w-full p-1 grid-cols-2 mb-4">
                <div className="w-1/2 m-2 h-full flex flex-col">
                    <div className="w-full bg-indigo-950 rounded-xl shadow-md h-full shadow-lg flex flex-col justify-start items-center">
                        {[1, 2, 3, 4].map(n => <Checkout />)}
                    </div>
                </div>
                <div className="h-12 bg-indigo-850 m-2 w-1/2 rounded-xl shadow-lg flex justify-center items-center">
                    <div className="text-white text-lg">
                    wtf

                    </div>
                </div>
            </div> */}
            
        </div>
    )
}

export default Home;