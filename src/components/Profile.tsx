import { useQuery } from '@apollo/client';
import React from 'react';
import { useLocation } from 'react-router';
import { GET_USER } from '../graphql/queries';
import { makeStyles } from '@material-ui/core/styles';
import AppBarSpacer from './AppBarSpacer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { GameStatus, UserType } from '../types';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex'
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        marginLeft: '40rem',
        marginRight: '40rem'
    },
    divider: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    userInfo: {
        padding: 30,
    }
}));

interface GetUserQuery {
    getUser: UserType
}

const Profile: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const { data, loading } = useQuery<GetUserQuery>(GET_USER, { variables: { username: location.pathname.split('/')[2] }});

    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {loading ? <CircularProgress />
                :
                data && data.getUser &&
                <>
                    <AppBarSpacer />
                    <AccountCircle style={{ width: 100, height: 100 }}  />
                    <Typography variant="h4">
                        {data.getUser.username}
                    </Typography>
                    <div className={classes.divider} />
                    <div className={classes.userInfo}>
                        <Typography variant="body1">
                            Account Created: {new Date(data.getUser.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">
                            Played Games: {data.getUser.games.filter(game => game.status === GameStatus.Ended).length}
                        </Typography>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default Profile;