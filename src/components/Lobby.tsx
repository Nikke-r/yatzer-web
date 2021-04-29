import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GameForm from './GameForm';
import { UserType } from '../types';
import Chat from './Chat';
import AppNotification from './AppNotification';
import LobbyUserList from './LobbyUserList';
import { CircularProgress } from '@material-ui/core';
import useLobby from '../hooks/useLobby';

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

    return (
        <div className={classes.container}>
            {loading ?
            <CircularProgress />
            :
            lobby ? 
            <>
                <LobbyUserList users={lobby?.users} />
                <GameForm user={user} />
                <Chat messages={lobby.messages} sendMessage={handleMessageSending} />
            </>
            :
            <p>Something went wrong</p>}
            {notification && <AppNotification notification={notification} />}
        </div>
    );
};

export default Lobby;