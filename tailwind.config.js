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
                'theta-home-checkout-feed-purchase': '#4a4248',
                'theta-tasks-taskgroup': '#342E32',
                'theta-tasks-taskgroup-individual': '#3d363b',
                'theta-tasks-taskgroup-individual-selected': '#474045',
                'theta-tasks-taskgroup-border': '#4a4147', //this color was good #52484e
                'theta-tasks-taskgroup-text': '#695c64',
                'theta-tasks-taskgroup-text-2': '#786872',
                'theta-tasks-taskgroup-text-3': '#917d8a',
                'theta-tasks-taskgroup-text-4': '#786872',
                'theta-tasks-taskgroup-tags-idle': '#8f7180',
                'theta-tasks-taskgroup-tags-idle-border': '#705160',
                'theta-tasks-taskgroup-tags-checkout': '#3d825f', //#3d825f and #3b4741 (way dark)
                'theta-tasks-taskgroup-tags-checkout-border': '#246142',
                'theta-tasks-taskgroup-tags-decline': '#823d3d',
                'theta-tasks-taskgroup-tags-decline-border': '#612424',
                'theta-tasks-taskgroup-tags-atc': '#bd8d26',
                'theta-tasks-taskgroup-tags-atc-border': '#7a5405',
                'theta-tasks-taskcomponent': '#2e282c',
                'theta-tasks-taskcomponent-start': '#4cc26b',
                'theta-tasks-taskcomponent-stop': '#ba9e4c',
                'theta-tasks-taskcomponent-delete': '#9c4155',
                'theta-profiles-individual': '#3b3438',
                'theta-profiles-individual-selected': '#423a3f',
                'theta-profiles-individual-border': '#4a2f3d',
                'theta-accounts-accountgroup-individual': '#40383c',
                'theta-settings-dashboard': '#995a7b',
                'theta-settings-deactivate': '#9c3346',
                'theta-settings-deactivate-border': '#ad4054',
                'theta-settings-dashboard-text': '#edd8e9'

            },
            height: {
                '0.25': '0.0625rem'
            },
            width: {
                '1/5': '20%',
                '1/10': '10%',
                '1/20': '5%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%',
                '15/100': '15%',
            },
            minWidth: {
                '1/5': '20%',
                '1/10': '10%',
                '1/20': '5%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%'
            },
            maxWidth: {
                '1/5': '20%',
                '1/10': '10%',
                '1/20': '5%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%'
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
