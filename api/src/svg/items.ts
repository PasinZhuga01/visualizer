namespace StructVisorAPI.SVG{
    export const Items = {
        'nav-toggle': `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="8" viewBox="0 0 18 8">
                <g fill="none" stroke="#000" stroke-width="2">
                    <line x1="0" y1="0" x2="18" y2="0"/>
                    <line x1="0" y1="4" x2="18" y2="4"/>
                    <line x1="0" y1="8" x2="18" y2="8"/>
                </g>
            </svg>
        `,
        'pause': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="42" height="48" viewBox="0 0 42 48" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 48) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M0 240 l0 -240 75 0 75 0 0 240 0 240 -75 0 -75 0 0 -240z"/>
                    <path d="M270 240 l0 -240 75 0 75 0 0 240 0 240 -75 0 -75 0 0 -240z"/>
                </g>
            </svg>    
        `,
        'play': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 24) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M0 120 c0 -66 3 -120 6 -120 11 0 194 114 194 121 0 7 -183 119 -194 119 -3 0 -6 -54 -6 -120z"/>
                </g>
            </svg>
        `,
        'skip': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="29" height="32" viewBox="0 0 29 32" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 32) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M0 160 c0 -139 2 -161 15 -156 8 3 55 33 105 66 l90 61 0 -66 0 -65 40 0 40 0 0 160 0 160 -40 0 -40 0 0 -65 0 -66 -90 61 c-50 33 -97 63 -105 66 -13 5 -15 -17 -15 -156z"/>
                </g>
            </svg>
        `,
        'step-back': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 34) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M85 275 c-44 -36 -81 -69 -83 -73 -2 -8 160 -142 172 -142 3 0 6 19 6 41 l0 42 48 -7 c76 -10 134 -44 157 -93 35 -75 47 -47 19 46 -27 91 -123 171 -206 171 -14 0 -18 8 -18 40 0 22 -3 40 -7 40 -5 -1 -44 -30 -88 -65z"/>
                </g>
            </svg>
        `,
        'step-forward': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 34) scale(0.1, -0.1)" fill="#000000" stroke="none">
                    <path d="M240 300 c0 -32 -4 -40 -18 -40 -83 0 -179 -80 -206 -171 -28 -93 -16 -121 19 -46 23 49 81 83 158 93 l47 7 0 -42 c0 -22 3 -41 6 -41 9 0 174 132 174 140 0 8 -165 140 -174 140 -3 0 -6 -18 -6 -40z"/>
                </g>
            </svg>
        `,
        'theme-toggle': `
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="46" height="46" viewBox="0 0 46.000000 46.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 46) scale(0.1, -0.1)" fill="#000000" stroke="none">
                <path d="M170 425 c0 -19 5 -35 10 -35 6 0 10 16 10 35 0 19 -4 35 -10 35 -5 0 -10 -16 -10 -35z"/>
                <path d="M220 235 c-118 -118 -211 -218 -207 -222 8 -7 437 415 437 429 0 5 -3 8 -8 8 -4 0 -104 -97 -222 -215z"/>
                <path d="M50 402 c0 -14 39 -46 47 -39 3 4 -2 16 -12 27 -19 21 -35 26 -35 12z"/>
                <path d="M275 390 c-10 -11 -15 -23 -12 -27 8 -7 47 25 47 39 0 14 -16 9 -35 -12z"/>
                <path d="M119 341 c-19 -19 -29 -40 -29 -59 0 -32 33 -82 46 -70 4 5 0 16 -9 26 -24 26 -21 65 6 90 28 26 64 28 89 5 10 -9 21 -13 26 -9 12 13 -38 46 -70 46 -19 0 -40 -10 -59 -29z"/>
                <path d="M412 304 c-11 -12 -10 -17 2 -30 15 -14 17 -14 32 0 14 14 14 18 0 31 -18 18 -18 18 -34 -1z"/>
                <path d="M0 280 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z"/>
                <path d="M284 196 c-47 -47 -47 -95 0 -142 47 -47 95 -47 142 0 21 21 34 44 34 60 0 29 -11 33 -30 11 -7 -8 -22 -15 -35 -15 -45 0 -73 63 -40 90 22 19 18 30 -11 30 -16 0 -39 -13 -60 -34z m38 -25 c-6 -42 37 -85 79 -79 36 6 37 -4 3 -31 -37 -29 -70 -26 -105 8 -34 35 -37 68 -8 105 27 34 37 33 31 -3z"/>
                <path d="M65 180 c-10 -11 -15 -23 -12 -27 8 -7 47 25 47 39 0 14 -16 9 -35 -12z"/>
                <path d="M182 44 c-11 -12 -10 -17 2 -30 15 -14 17 -14 32 0 14 14 14 18 0 31 -18 18 -18 18 -34 -1z"/>
                </g>
            </svg>
        `,
        'instructions-open': `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 16 4 C 9.3844277 4 4 9.3844277 4 16 C 4 22.615572 9.3844277 28 16 28 C 22.615572 28 28 22.615572 28 16 C 28 9.3844277 22.615572 4 16 4 z M 16 6 C 21.534692 6 26 10.465308 26 16 C 26 21.534692 21.534692 26 16 26 C 10.465308 26 6 21.534692 6 16 C 6 10.465308 10.465308 6 16 6 z M 16 10 C 13.802666 10 12 11.802666 12 14 L 14 14 C 14 12.883334 14.883334 12 16 12 C 17.116666 12 18 12.883334 18 14 C 18 14.767423 17.508714 15.44544 16.78125 15.6875 L 16.375 15.8125 C 15.559939 16.083523 15 16.862393 15 17.71875 L 15 19 L 17 19 L 17 17.71875 L 17.40625 17.59375 C 18.944786 17.08181 20 15.620577 20 14 C 20 11.802666 18.197334 10 16 10 z M 15 20 L 15 22 L 17 22 L 17 20 L 15 20 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"/>
            </svg>
        `,
        'clear-storage-open': `
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 729.837 729.838" style="enable-background:new 0 0 729.837 729.838;" xml:space="preserve">
                <g>
                    <g>
                        <g>
                            <path d="M589.193,222.04c0-6.296,5.106-11.404,11.402-11.404S612,215.767,612,222.04v437.476c0,19.314-7.936,36.896-20.67,49.653c-12.733,12.734-30.339,20.669-49.653,20.669H188.162c-19.315,0-36.943-7.935-49.654-20.669c-12.734-12.734-20.669-30.313-20.669-49.653V222.04c0-6.296,5.108-11.404,11.403-11.404c6.296,0,11.404,5.131,11.404,11.404v437.476c0,13.02,5.37,24.922,13.97,33.521c8.6,8.601,20.503,13.993,33.522,13.993h353.517c13.019,0,24.896-5.394,33.498-13.993c8.624-8.624,13.992-20.503,13.992-33.498V222.04H589.193z"/>
                            <path d="M279.866,630.056c0,6.296-5.108,11.403-11.404,11.403s-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.108-11.404,11.404-11.404s11.404,5.108,11.404,11.404V630.056z"/>
                            <path d="M376.323,630.056c0,6.296-5.107,11.403-11.403,11.403s-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.108-11.404,11.404-11.404s11.403,5.108,11.403,11.404V630.056z"/>
                            <path d="M472.803,630.056c0,6.296-5.106,11.403-11.402,11.403c-6.297,0-11.404-5.107-11.404-11.403v-405.07c0-6.296,5.107-11.404,11.404-11.404c6.296,0,11.402,5.108,11.402,11.404V630.056L472.803,630.056z"/>
                            <path d="M273.214,70.323c0,6.296-5.108,11.404-11.404,11.404c-6.295,0-11.403-5.108-11.403-11.404c0-19.363,7.911-36.943,20.646-49.677C283.787,7.911,301.368,0,320.73,0h88.379c19.339,0,36.92,7.935,49.652,20.669c12.734,12.734,20.67,30.362,20.67,49.654c0,6.296-5.107,11.404-11.403,11.404s-11.403-5.108-11.403-11.404c0-13.019-5.369-24.922-13.97-33.522c-8.602-8.601-20.503-13.994-33.522-13.994h-88.378c-13.043,0-24.922,5.369-33.546,13.97C278.583,45.401,273.214,57.28,273.214,70.323z"/>
                            <path d="M99.782,103.108h530.273c11.189,0,21.405,4.585,28.818,11.998l0.047,0.048c7.413,7.412,11.998,17.628,11.998,28.818v29.46c0,6.295-5.108,11.403-11.404,11.403h-0.309H70.323c-6.296,0-11.404-5.108-11.404-11.403v-0.285v-29.175c0-11.166,4.585-21.406,11.998-28.818l0.048-0.048C78.377,107.694,88.616,103.108,99.782,103.108L99.782,103.108zM630.056,125.916H99.782c-4.965,0-9.503,2.02-12.734,5.274L87,131.238c-3.255,3.23-5.274,7.745-5.274,12.734v18.056h566.361v-18.056c0-4.965-2.02-9.503-5.273-12.734l-0.049-0.048C639.536,127.936,635.021,125.916,630.056,125.916z"/>
                        </g>
                    </g>
                </g>
            </svg>   
        `
    } as const satisfies Record<string, string>;
}