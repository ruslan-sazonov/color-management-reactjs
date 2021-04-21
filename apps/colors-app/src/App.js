
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Navbar from 'components/Navbar';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => createMuiTheme({
            palette: {
                type: prefersDarkMode ? 'dark' : 'light',
                primary: {
                    main: '#4dd0e1',
                },
            },
        }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={4}>
                <CssBaseline/>
                <BrowserRouter>
                    <Navbar />
                    <Routes />
                </BrowserRouter>  
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
