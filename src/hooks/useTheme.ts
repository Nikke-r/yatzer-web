import { createMuiTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

const useTheme = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    const theme = createMuiTheme({
        palette: {
            type: darkTheme ? 'dark' : 'light',
        },
    });

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        setDarkTheme(theme === 'dark' ? true : false);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    }

    return {
        darkTheme,
        theme,
        toggleTheme
    }
}

export default useTheme;