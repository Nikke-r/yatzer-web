import React from 'react';
import useDropDownMenu from '../hooks/useDropDownMenu';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { GameStatus } from '../types';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE_TO_LOBBY } from '../graphql/mutations';

interface Props {
    slug: string;
    openModal: () => void;
    status: GameStatus
}

const GameMenu: React.FC<Props> = ({ slug, openModal, status }) => {
    const {
        menuOpen,
        menuAnchorRef,
        toggleMenu,
        handleMenuClose,
        handleListKeyDown,
        closeMenu
    } = useDropDownMenu();
    const [sendMessageToLobby] = useMutation(SEND_MESSAGE_TO_LOBBY);

    return (
        <div>
            <Button
                endIcon={<ArrowDropDown />}
                onClick={toggleMenu}
                variant="outlined"
                ref={menuAnchorRef}
                aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup={true}
                disabled={status !== GameStatus.Created}
            >
                {slug}
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
                                        openModal();
                                    }}>
                                        Invite Friends
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        navigator.clipboard.writeText(slug);
                                        closeMenu();
                                    }}>
                                        Copy Room Code
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        sendMessageToLobby({ variables: { message: `Looking for players in room ${slug}!` }});
                                        closeMenu();
                                    }}>
                                        Send Code to the Lobby
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

export default GameMenu;