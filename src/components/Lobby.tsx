import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GameForm from './GameForm';
import { UserType } from '../types';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '100vh',
    },
    placeholder: {
        display: 'flex',
        flex: 1,
    }
}));

interface Props {
    user: UserType | undefined;
}

const Lobby: React.FC<Props> = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <GameForm user={user} />
        </div>
    );
};

export default Lobby;