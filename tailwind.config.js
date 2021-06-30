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
                'theta-medium': '#9873B9',
                'theta-light': '#4d434a',
                'theta-salmon': '#FFCCCC',
                'theta-bg': '#383135',
                'theta-bg-start': '#362f33',
                'theta-sidebar-icon': '#826f79',
                'theta-logo': '#bf7a9e',
                'theta-sidebar-icon-selected': '#e08db8'
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
    ],
}
