import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBarSpacer from './AppBarSpacer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    }
}));

const FrontPage: React.FC = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <AppBarSpacer />
            <div className={classes.title}>
                <Typography variant="h3">
                    Welcome to Yatzer!
                </Typography>
            </div>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
                Yatzer is a simple website where you can play Yahtzee online with your friends!
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
                Sign Up or Sign In to get started right away!
            </Typography>
        </Container>
    );
};

export default FrontPage;