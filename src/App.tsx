import React from 'react';
import './App.css';
import useTheme from './hooks/useTheme';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from './components/TopNav';
import useAuth from './hooks/useAuth';
import 'fontsource-roboto';
import SignUpForm from './components/SignUpForm';
import { Switch, Route } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import GameForm from './components/GameForm';
import Game from './components/Game';
import GamesList from './components/GamesList';
import FrontPage from './components/FrontPage';
import Center from './components/Center';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden'
    },
    content: {
        flexGrow: 1,
        display: 'flex'
    }
}));

const App = () => {
    const classes = useStyles();
    const {
        darkTheme,
        toggleTheme,
        theme,
    } = useTheme();
    const {
        signUp,
        signIn,
        signOut,
        user,
        authLoading,
    } = useAuth();

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <div className={classes.root}>
                    <CssBaseline />
                    <TopNav 
                        darkTheme={darkTheme}
                        toggleTheme={toggleTheme}
                        user={user}
                        signOut={signOut}
                    />
                    <main className={classes.content}>
                        {authLoading ?
                        <Center>
                            <CircularProgress />
                        </Center>
                        :
                        user ?
                        <>
                            <Route exact path="/">
                                <GameForm user={user} />
                            </Route>
                            <Route path="/game/:id">
                                <Game user={user} />
                            </Route>
                            <Route path='/games'>
                                <GamesList 
                                    games={user.games}
                                />
                            </Route>
                        </>
                        :
                        <>
                            <Route exact path="/">
                                <FrontPage />
                            </Route>
                            <Route path="/signIn">
                                <SignInForm
                                    signIn={signIn}
                                />
                            </Route>
                            <Route path="/signUp">
                                <SignUpForm
                                    signUp={signUp}
                                />
                            </Route>
                        </>}
                    </main>
                </div>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
