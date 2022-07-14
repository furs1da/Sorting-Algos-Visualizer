import { createTheme } from '@mui/material/styles';

/**
 * themeButtons is a created Theme used in SortingContainer.js to style control buttons (Start, Stop, Generate New Array, Initial State)
 * I used createTheme function of MUI to make styling of the buttons more flexible and convenient and to expand my knowledge in MUI related 
 * to Themes instrument
 */

const themeButtons = createTheme({
    palette: {
        start: {
          main: '#008A68'
        },
        stop: {
            main: '#A40000'
        },
        newArray: {
            main: '#054d95'
        },
        initial: {
            main: '#9800a3'
        },
    }
});

export default themeButtons;