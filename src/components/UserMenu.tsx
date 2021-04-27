import React from 'react';
import Button from '@material-ui/core/Button';
import { UserType } from '../types';
import AvatarImage from './AvatarImage';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import useDropDownMenu from '../hooks/useDropDownMenu';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';

interface Props {
    user: UserType;
    signOut: () => void;
}

const UserMenu: React.FC<Props> = ({ user, signOut }) => {
    const history = useHistory();
    const {
        menuOpen,
        menuAnchorRef,
        toggleMenu,
        handleMenuClose,
        handleListKeyDown,
        closeMenu
    } = useDropDownMenu();

    return (
        <div>
            <Button
                startIcon={<AvatarImage user={user} />}
                endIcon={<ArrowDropDown />}
                ref={menuAnchorRef}
                onClick={toggleMenu}
                aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup={true}
            >
                {user.username}
            </Button>
            <Popper
                open={menuOpen}
                anchorEl={menuAnchorRef.current}
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
                            <ClickAwayListener
                                onClickAway={handleMenuClose}
                            >
                                <MenuList
                                    autoFocusItem={menuOpen}
                                    onKeyDown={handleListKeyDown}
                                    id="menu-list-grow"
                                >
                                    <MenuItem onClick={() => {
                                        closeMenu();
                                        history.push('/games');
                                    }}>
                                        My Games
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        signOut();
                                        closeMenu();
                                    }}>
                                        Sign Out
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default UserMenu;