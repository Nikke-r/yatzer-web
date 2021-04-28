import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GameForm from './GameForm';
import { UserType } from '../types';
import Hiscores from './Hiscores';

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
            <div className={classes.placeholder}>
                <Hiscores />
            </div>
            <GameForm user={user} />
            <div className={classes.placeholder} />
        </div>
    );
};

export default Lobby;