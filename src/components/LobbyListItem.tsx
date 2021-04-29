import React from 'react';
import { UserType } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import AvatarImage from './AvatarImage';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        alignItems: 'center'
    }
}));

interface Props {
    user: UserType;
}

const LobbyListItem: React.FC<Props> = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <AvatarImage user={user} />
            <Typography variant="body1" style={{ marginLeft: 5 }}>
                {user.username}
            </Typography>  
        </div>
    );
};

export default LobbyListItem;