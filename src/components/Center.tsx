import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBarSpacer from './AppBarSpacer';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
    },
}));

const Center: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <AppBarSpacer />
            {children}
        </div>
    );
};

export default Center;