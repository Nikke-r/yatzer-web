import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GameForm from './GameForm';
import { UserType } from '../types';
import Chat from './Chat';
import AppNotification from './AppNotification';
import LobbyUserList from './LobbyUserList';
import { CircularProgress } from '@material-ui/core';
import useLobby from '../hooks/useLobby';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '100vh',
    },
}));

interface Props {
    user: UserType | undefined;
}

const Lobby: React.FC<Props> = ({ user }) => {
    const classes = useStyles();
    const {
        loading,
        lobby,
        handleMessageSending,
        notification,
    } = useLobby(user!.username);
    const matches = useMediaQuery('(min-width: 800px)');

    console.log(matches);

    return (
        <div className={classes.container}>
            {loading ?
            <CircularProgress />
            :
            lobby ? 
            <>
                {matches && <LobbyUserList users={lobby?.users} />}
                <GameForm user={user} />
                {matches && <Chat messages={lobby.messages} sendMessage={handleMessageSending} />}
            </>
            :
            <p>Something went wrong</p>}
            {notification && <AppNotification notification={notification} />}
        </div>
    );
};

export default Lobby;