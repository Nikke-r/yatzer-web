import { createMuiTheme } from "@material-ui/core/styles";
import { useState } from "react";

const useTheme = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    const theme = createMuiTheme({
        palette: {
            type: darkTheme ? 'dark' : 'light',
        },
    });

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