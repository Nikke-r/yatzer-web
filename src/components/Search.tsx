import React from 'react';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import useSearch from '../hooks/useSearch';
import AvatarImage from './AvatarImage';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import { NotificationTypes, UserType } from '../types';
import { useMutation } from '@apollo/client';
import { SEND_NOTIFICATION } from '../graphql/mutations';

const useStyles = makeStyles(theme => 
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.black, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.black, 0.25)
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    })    
);

interface Props {
    currentUser: UserType;
}

const Search: React.FC<Props> = ({ currentUser }) => {
    const classes = useStyles();
    const [sendNotification] = useMutation(SEND_NOTIFICATION);
    const {
        handleInputChange,
        searchInput,
        searchResult,
        loading,
        searchBarRef,
        clearSearchInput
    } = useSearch();

    return (
        <div>
            <div className={classes.search} ref={searchBarRef}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase 
                    placeholder="Search users..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    onChange={handleInputChange}
                    value={searchInput}
                />
            </div>
            <Popper
                open={searchInput !== ''}
                anchorEl={searchBarRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper style={{ minWidth: 300 }}>
                            <ClickAwayListener
                                onClickAway={clearSearchInput}
                            >
                                {loading ?
                                <CircularProgress />
                                :
                                searchResult.length > 0 ?
                                <List>
                                    {searchResult.map(result => (
                                        <>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <AvatarImage user={result} />
                                                </ListItemAvatar>
                                                <ListItemText primary={result.username} />
                                                {!currentUser.friends.find(friend => friend.username === result.username) && result.username !== currentUser.username &&
                                                <Button onClick={() => {
                                                    sendNotification({ variables: { type: NotificationTypes.FriendRequest, to: [result.username] }});
                                                    clearSearchInput();
                                                }}>
                                                    Add as a friend
                                                </Button>}
                                            </ListItem>
                                            <Divider />
                                        </>
                                    ))}
                                </List>
                                :
                                <p>No results</p>}
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default Search;