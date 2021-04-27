import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationIcon from '@material-ui/icons/Notifications';
import useDropDownMenu from '../hooks/useDropDownMenu';
import Badge from '@material-ui/core/Badge';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ACCEPT_FRIEND_REQUEST, DISMISS_NOTIFICATION, JOIN_GAME } from '../graphql/mutations';
import { useHistory } from 'react-router';
import { Notifications, NotificationTypes } from '../types';

interface Props {
    notifications: Notifications[];
}

const NotificationMenu: React.FC<Props> = ({ notifications }) => {
    const [joinGameMutation] = useMutation(JOIN_GAME);
    const [dismissNotification] = useMutation(DISMISS_NOTIFICATION);
    const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
    const history = useHistory();
    const {
        menuOpen,
        menuAnchorRef,
        toggleMenu,
        handleMenuClose,
        closeMenu
    } = useDropDownMenu();

    return (
        <div>
            <IconButton
                ref={menuAnchorRef}
                onClick={toggleMenu}
                aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup={true}
            >
                <Badge
                    badgeContent={notifications.length}
                    color="primary"
                >
                    <NotificationIcon />
                </Badge>
            </IconButton>
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
                                <List>
                                    {notifications.length > 0 ?
                                    notifications.map(notification => (
                                        <ListItem
                                            divider
                                            style={{ flexDirection: 'column' }}
                                        >
                                            <Typography>
                                                {notification.from.username} {notification.type === NotificationTypes.FriendRequest ? 'wants to be your friend' : 'wants you to join a game'}
                                            </Typography>
                                            <div>
                                                {notification.type === NotificationTypes.FriendRequest ?
                                                <Button
                                                    variant="text"
                                                    style={{ color: 'lightgreen' }}
                                                    onClick={async () => {
                                                        await acceptFriendRequest({ variables: { id: notification.id }});
                                                        await dismissNotification({ variables: { id: notification.id } });
                                                        closeMenu();
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                :
                                                <Button 
                                                    onClick={async () => {
                                                        await joinGameMutation({ variables: { slug: notification.slug }});
                                                        await dismissNotification({ variables: { id: notification.id }});

                                                        closeMenu();
                                                        history.push(`/game/${notification.slug}`);
                                                    }}
                                                    style={{ color: 'lightgreen' }}
                                                >
                                                    Join    
                                                </Button>}
                                                <Button 
                                                    onClick={() => {
                                                        dismissNotification({ variables: { id: notification.id } });
                                                        closeMenu();
                                                    }}
                                                    color="secondary"
                                                    variant="text"
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        </ListItem>
                                    ))
                                    :
                                    <ListItemText>
                                        <Typography style={{ margin: 10 }}>
                                            No new notifications    
                                        </Typography>    
                                    </ListItemText>}
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default NotificationMenu;