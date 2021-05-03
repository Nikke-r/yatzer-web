import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBarSpacer from './AppBarSpacer';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
                Yatzer is a simple website where you can play Yahtzee online.
                <br />
                <br />
                Challenge your friends, users from the lobby or play by yourself!
                <br />
                <br />
                <Link to="/signIn" style={{ textDecoration: 'none', color: 'inherit', textDecorationLine: 'underline' }}>
                    Sign in
                </Link>
                &nbsp;
                or
                &nbsp;
                <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit', textDecorationLine: 'underline' }}>
                    sign up
                </Link>
                &nbsp;
                 to get started!
                <br />
                <br />
            </Typography>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
                Features
            </Typography>
            <ul>
                <li>See users in the lobby and chat with them</li>
                <li>Create a game room and invite users the game (1-5 players)</li>
                <li>Join a game room using unique room code</li>
                <li>Continue your games where you left them</li>
                <li>See all of your games (created, running and ended ones)</li>
                <li>Search users and add them as your friend</li>
                <li>See who has played the most games</li>
                <li>See who has scored the most points in one game</li>
                <li>See who has won the most in the games where there are at least two players</li>
            </ul>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
                Known bugs
            </Typography>
            <ul>
                <li>Sometimes one user is shown in the lobby twice</li>
                <li>Search doesn't always show all of the users</li>
                <li>Sign out doesn't always sign out</li>
                <li>Some of the data might not update real time always in everywhere (like friends etc..). Refreshing the page helps!</li>
            </ul>
        </Container>
    );
};

export default FrontPage;