import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { UserType } from '../types';
import Sun from '@material-ui/icons/Brightness7';
import Moon from '@material-ui/icons/Brightness3';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';
import Search from './Search';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
    titleText: {
        flexGrow: 1,
        userSelect: 'none'
    }
}));

interface Props {
    darkTheme: boolean;
    toggleTheme: () => void;
    user: UserType | undefined
    signOut: () => void;
}

const TopNav: React.FC<Props> = ({ darkTheme, toggleTheme, user, signOut }) => {
    const classes = useStyles();

    return (
        <AppBar position="absolute" color="inherit">
            <Toolbar>
                <Typography className={classes.titleText}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Yatzer
                    </Link>
                </Typography>
                {darkTheme ?
                    <Moon />
                :
                    <Sun />}
                <Switch 
                    checked={darkTheme}
                    onChange={toggleTheme}
                />
                {user ?
                    <>
                        <Search currentUser={user} />
                        <Link to='/hiscores' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <IconButton>
                                <EmojiEvents />
                            </IconButton>
                        </Link>
                        <NotificationMenu notifications={user.notifications} />
                        <UserMenu user={user} signOut={signOut} />
                    </>
                :
                <>
                    <Button>
                        <Link to="/signIn" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Sign In
                        </Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Sign Up
                        </Link>
                    </Button>
                </>}
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;