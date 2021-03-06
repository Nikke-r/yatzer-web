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
import { useMutation } from '@apollo/client';
import { REMOVE_USER_FROM_LOBBY } from '../graphql/mutations';

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
    const [removeUserFromLobby] = useMutation(REMOVE_USER_FROM_LOBBY);

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
                                        history.push('/games');
                                        closeMenu();
                                    }}>
                                        My Games
                                    </MenuItem>
                                    <MenuItem onClick={async () => {
                                        try {
                                            const { data } = await removeUserFromLobby({ variables: { username: user.username }});
                                            if (data) {
                                                console.log(data);
                                                signOut();
                                                closeMenu();
                                            }
                                        } catch (error) {
                                            console.log(error.message);
                                        }
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