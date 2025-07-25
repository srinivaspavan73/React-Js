import React, {useContext} from "react";
import { ThemeProvider } from "./ThemeContext";
import ThemeContext from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

function ThemeBox(){
    const {theme,themeStyles} = useContext(ThemeContext);
    return(
        <div style={themeStyles}>
            <h2>{theme}</h2>
            <p>This is our Theme Box</p>
        </div>
    );
}
function Theme(){
    return(
        <ThemeProvider>
            <ThemeToggle/>
            <ThemeBox/>
        </ThemeProvider>
    )
}
export default Theme;