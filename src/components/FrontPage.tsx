import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBarSpacer from './AppBarSpacer';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_GAME_COUNT, GET_USER_COUNT } from '../graphql/queries';

const useStyles = makeStyles(() => ({
    title: {
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    }
}));

const FrontPage: React.FC = () => {
    const getUserCount = useQuery(GET_USER_COUNT);
    const getGameCount = useQuery(GET_GAME_COUNT);
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
            <Typography variant="body1" style={{ textAlign: 'center' }}>
                {getUserCount.data && getUserCount.data.getUserCount} users registered
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
                {getGameCount.data && getGameCount.data.getGameCount} games created
            </Typography>
        </Container>
    );
};

export default FrontPage;