import React from 'react';
import { UserType } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import AppBarSpacer from './AppBarSpacer';
import Typography from '@material-ui/core/Typography';
import LobbyListItem from './LobbyListItem';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
        padding: 30,
    },
    content: {

    }
}))

interface Props {
    users: UserType[];
}

const LobbyUserList: React.FC<Props> = ({ users }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <AppBarSpacer />
                <Typography variant="h4" style={{ paddingBottom: 20 }}>
                    Users online
                </Typography>
                {users.map(user => <LobbyListItem key={user.username} user={user} />)}
            </div>
        </div>
    );
};

export default LobbyUserList;