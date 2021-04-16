import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    spacer: theme.mixins.toolbar
}));

const AppBarSpacer = () => {
    const classes = useStyles();

    return (
        <div className={classes.spacer} />
    );
};

export default AppBarSpacer;