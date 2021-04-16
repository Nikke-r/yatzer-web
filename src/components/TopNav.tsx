import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { UserType } from '../types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'; 
import Sun from '@material-ui/icons/Brightness7';
import Moon from '@material-ui/icons/Brightness3';
import { Link } from 'react-router-dom';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

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
    signOut: () => Promise<void>;
}

const TopNav: React.FC<Props> = ({ darkTheme, toggleTheme, user, signOut }) => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }

    const handleMenuClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setMenuOpen(false);
    }

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setMenuOpen(false);
        }
    }

    const prevOpen = useRef(menuOpen);

    useEffect(() => {
        if (prevOpen.current === true && menuOpen === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = menuOpen;
    }, [menuOpen]);

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
                        <Button 
                            startIcon={<AccountCircle />} 
                            endIcon={<ArrowDropDown />}
                            ref={anchorRef}
                            onClick={toggleMenu}
                            aria-controls={menuOpen ? 'menu-list-gron' : undefined}
                            aria-haspopup={true}
                        >
                            {user.username}
                        </Button>
                        <Popper
                            open={menuOpen}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleMenuClose}>
                                            <MenuList
                                                autoFocusItem={menuOpen}
                                                onKeyDown={handleListKeyDown}
                                                id="menu-list-grow"
                                            >
                                                <MenuItem onClick={signOut} >Sign Out</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
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