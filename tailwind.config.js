module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'indigo-850': '#36328c',
                'indigo-950': '#282669',
                'indigo-975': '#211f57',
                'indigo-1000': '#1f1d52',
                'indigo-1100': '#16153b', 
                'theta-sidebar': '#302b2f',
                'theta-sidebar-dark': '#2b272a',
                'theta-sidebar-icon': '#826f79',
                'theta-logo': '#bf7a9e',
                'theta-sidebar-icon-selected': '#e08db8',
                'theta-bg': '#383135',
                'theta-bg-start': '#362f33',
                'theta-home-checkouts': '#4ad9a7',
                'theta-home-declines': '#d94a69',
                'theta-home-updates': '#eda8df',
                'theta-home-checkout-feed': '#40393e',
                'theta-white': '#fcedf9',
                'theta-gray': '#d6c9d4',
                'theta-gray-2': '#c9bbc7',
                'theta-gray-3': '#b8abb6',
                'theta-gray-4': '#ada0ab',
                'theta-gray-5': '#a698a4',
                'theta-gray-6': '#9e909c',
                'theta-gray-7': '#968995',
                'theta-home-checkout-feed-purchase': '#4a4248'
                
            },
            height: {
                '0.25': '0.0625rem'
            }
        },
    },
    variants: {
        caretColor: ['dark', 'active'], // Default variants
        extend: {},
    },
    plugins: [
        require('tailwind-caret-color'),
        require('tailwind-scrollbar-hide')
    ]
}
