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
                'indigo-1100': '#16153b'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
