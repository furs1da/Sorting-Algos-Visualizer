import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';

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