import React, {createContext,useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider( {children} ) {
    const [theme,setTheme] = useState('light');

    const toggleTheme = () => setTheme(theme==='light' ? 'dark' : 'light');

    const themeStyles = {
        backgroundColor: theme==='light' ? 'white' : '#333',
        color: theme==='light' ? 'black' : 'white',
        padding: '20px',
        textAlign: 'center'
    };

    return(
        <ThemeContext.Provider value={ {theme,toggleTheme,themeStyles } }>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;