import React, {
    FC,
    useState
} from 'react';
import ScreenWrapper from "../../Components 2/Component Library/ScreenWrapper";

const CheckoutsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
)

const DeclinesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
)

const UpdatesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
    </svg>
)

const CheckoutFeedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
)

const AnalyticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
)

interface CheckoutFeedPurchaseProps {
    productTitle: string,
    store: string,
    profile: string,
    size: string,
    proxyList: string,
    price: number
}

const CheckoutFeedPurchase : FC<CheckoutFeedPurchaseProps> = ({
    productTitle,
    store,
    profile,
    size,
    proxyList,
    price
} : CheckoutFeedPurchaseProps) => {
    return (
        <div className="space-x-2 p-2 w-full h-16 bg-theta-home-checkout-feed-purchase rounded-md shadow-md flex flex-row justify-start items-center">
            <div className="h-full w-12 rounded-md bg-theta-white shadow-md">
                <img 
                className="rounded-md"
                src={`https://images-na.ssl-images-amazon.com/images/I/61JbCra%2B7GL._SX342_.jpg`}
                />
            </div>
            <div className="flex flex-col justify-center items-start">
                <div className="text-xl text-theta-gray-2 font-me leading-5 font-medium">
                    {productTitle}
                </div>
                <div className="flex flex-row justify-start items-center text-xl leading-5">
                    <div className="text-theta-gray-4">
                        {store}
                    </div>
                    <div className="text-theta-gray-7 mx-1">•</div>
                    <div className="text-theta-gray-4">
                        {size}
                    </div>
                </div>
                
            </div>
            <div className="flex flex-1 justify-end items-center font-bold text-theta-gray-4 text-xl">
                {`$${price}`}
            </div>
        </div>
    )
}


const Home = () => {

    const impliedPadding = 'p-2'
    const updates = [
        "Version 1.0.0\nAdd Amazon US fast mode\nFix UI bugs in add tasks\nMore bug fixes",
        "Version 1.0.0\nAdd Amazon US fast mode\nFix UI bugs in add tasks\nMore bug fixes",
        "Version 1.0.0\nAdd Amazon US fast mode\nFix UI bugs in add tasks\nMore bug fixes",
        "Version 1.0.0\nAdd Amazon US fast mode\nFix UI bugs in add tasks\nMore bug fixes",
        "Version 1.0.0\nAdd Amazon US fast mode\nFix UI bugs in add tasks\nMore bug fixes"
    ]
    const checkoutsArray = () => [
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        },
        {
            productTitle: 'PS6 Quantum Edition',
            store: "Amazon",
            profile: "Real Card",
            size: "Random",
            proxyList: "Resi Main",
            price: 699
        }
    ]

    const [currentVersion, setCurrentVersion] = useState<string>('v1.0.0');
    const [totalCheckouts, setTotalCheckouts] = useState<number>(10);
    const [totalDeclines, setTotalDeclines] = useState<number>(3);
    const [updateLogs, setUpdateLogs] = useState<string[]>(updates)
    const [checkouts, setCheckouts] = useState<CheckoutFeedPurchaseProps[]>(checkoutsArray)


    

    return (
        <ScreenWrapper>
            <div className="h-1/3 w-full flex flex-row justify-start items-center">

                {/* Updates */}
                <div className={`h-full w-1/2 ${impliedPadding}`}>
                    <div className="flex flex-col justify-start items-start w-full h-full rounded-md shadow-md bg-theta-home-updates p-4">

                        {/* Top banner */}
                        <div className="w-full flex flex-row justify-between items-center mb-2">
                            <div className="text-theta-white flex flex-row justify-start items-center space-x-4">
                                <div className="text-3xl font-medium">
                                    Updates
                                </div>
                                <UpdatesIcon />
                            </div>
                            
                            <div className="text-theta-white text-xl font-medium">
                                {currentVersion}
                            </div>
                        </div>
                        
                        {/* Top gradient fade */}
                        <div className="relative w-full">
                            <div className="z-10 absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-theta-home-updates to-transparent"></div>
                        </div>

                        {/* Actual scrolling list of updates */}
                        <div className="flex flex-col justify-start items-start overflow-scroll scrollbar-hide text-xl">
                            
                            {/* Actual logs */}
                            {updateLogs.map(log => (
                                <div className="text-theta-white">
                                    {log.split('\n').map((l, i) => i === 0 ? 
                                        <div className="font-medium">{l}</div> : 
                                        <div>{"- " + l}</div>
                                    )}
                                    <div className="h-4"></div>
                                </div>
                            ))}

                        </div>

                        {/* Bottom gradient fade */}
                        <div className="relative w-full">
                            <div className="absolute bottom-0 right-0 left-0 h-3 bg-gradient-to-t from-theta-home-updates to-transparent"></div>
                        </div>

                    </div>
                </div>

                {/* Checkouts */}
                <div className={`h-full w-1/4 ${impliedPadding}`}>
                    <div className="w-full h-full rounded-md shadow-md bg-theta-home-checkouts flex flex-row justify-center items-center text-theta-white">
                        <CheckoutsIcon />
                        {/* NOTE: MB-1 because it looks better with current icons */}
                        <div className="mb-1 text-5xl font-bold">
                            {totalCheckouts}
                        </div>
                    </div>
                </div>

                {/* Declines */}
                <div className={`h-full w-1/4 ${impliedPadding}`}>
                    <div className="w-full h-full rounded-md shadow-md bg-theta-home-declines flex flex-row justify-center items-center text-theta-white">
                        <DeclinesIcon />
                        {/* NOTE: MB-1 because it looks better with current icons */}
                        <div className="mb-1 text-5xl font-bold self-center">
                            {totalDeclines}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-2/3 w-full flex flex-row justify-start items-center">
                <div className={`h-full w-1/2 ${impliedPadding}`}>
                    <div className="w-full h-full rounded-md shadow-md bg-theta-home-checkout-feed p-4 flex flex-col justify-start items-start">
                        
                        {/* Header */}
                        <div className="mb-4 text-theta-gray-2 space-x-4 flex flex-row justify-start items-center">
                            <div className="text-4xl font-medium">
                                Analytics
                            </div>
                            <AnalyticsIcon />
                        </div>

                        {/* Graph */}
                        <div className="w-full h-full rounded-md shadow-md bg-theta-home-checkout-feed-purchase flex justify-center items-center">
                            <div className="text-theta-white text-4xl font-bold">
                                Coming soon 😉
                            </div>
                        </div>
                    </div>
                    
                </div>

                {/* Checkout feed */}
                <div className={`h-full w-1/2 ${impliedPadding}`}>
                    <div className="w-full h-full rounded-md shadow-md bg-theta-home-checkout-feed p-4 flex flex-col justify-start items-start">
                        <div className="mb-4 text-theta-gray-2 space-x-4 flex flex-row justify-start items-center">
                            <div className="text-4xl font-medium">
                                Checkouts
                            </div>
                            <CheckoutFeedIcon />
                        </div>

                        {/* Top gradient fade */}
                        <div className="relative w-full">
                            <div className="z-10 absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-theta-home-checkout-feed to-transparent"></div>
                        </div>

                        {/* Checkouts List */}
                        <div className="space-y-2 flex flex-col justify-start items-center w-full overflow-scroll scrollbar-hide">
                            <div className="h-2"></div>
                            {checkouts.map((co) => (
                                <CheckoutFeedPurchase 
                                    {...co}
                                />
                            ))}
                        </div>

                        {/* Bottom gradient fade */}
                        <div className="relative w-full">
                            <div className="z-10 absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-theta-home-checkout-feed to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenWrapper>
    )
}

export default Home;