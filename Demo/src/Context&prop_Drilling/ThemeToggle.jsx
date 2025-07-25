import React, {useContext} from "react";
import ThemeContext from "./ThemeContext";

function ThemeToggle(){
    const {theme, toggleTheme} = useContext(ThemeContext);

    return(
        <button onClick={toggleTheme}>
        Switch to {theme ==='light'? 'Dark' : 'Light'}
        </button>
    );
}

export default ThemeToggle;