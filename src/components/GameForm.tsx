import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GameType, JoinGameValues, UserType } from '../types';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { CREATE_GAME, JOIN_GAME } from '../graphql/mutations';
import useAppNotifications from '../hooks/useAppNotifications';
import AppNotification from './AppNotification';
import AppBarSpacer from './AppBarSpacer';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1.5,
        display: 'flex',
        maxHeight: '100vh',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 30,
    },
    formArea: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    form: {
        width: '100%'
    },
    button: {
        height: 60,
    }
}));

const validationSchema = Yup.object({
    slug: Yup.string().min(4).max(4).required('This field is required'),
});

const initialValues: JoinGameValues = {
    slug: '',
};

interface Props {
    user: UserType | undefined;
};

interface CreateGameResponse {
    createGame: GameType;
}

interface JoinGameResponse {
    joinGame: GameType;
}

const GameForm: React.FC<Props> = ({ user }) => {
    const { handleNotification, notification } = useAppNotifications();
    const [createGame] = useMutation<CreateGameResponse>(CREATE_GAME, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5)});
    const [joinGame] = useMutation<JoinGameResponse>(JOIN_GAME, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5)});
    const classes = useStyles();
    const history = useHistory();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => handleGameJoin(values),
    });

    const handleGameCreation = async () => {
        try {
            const { data } = await createGame();

            if (data && data.createGame) {
                history.push(`/game/${data.createGame.slug}`);
            }
        } catch (error) {
            console.log(`Error while creating the game: ${error.message}`);
        }
    }

    const handleGameJoin = async (values: JoinGameValues) => {
        try {
            const { data } = await joinGame({ variables: values });

            if (data && data.joinGame) {
                history.push(`/game/${data.joinGame.slug}`);
            }
        } catch (error) {
            console.log(`Error while joining the game: ${error.message}`);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <AppBarSpacer />
                {user &&
                <div className={classes.formArea}>
                    <Typography variant="h4">
                        Nice to see you {user.username}!
                    </Typography>
                    <Typography variant="h6">
                        What you want to do?
                    </Typography>
                    <Button 
                        fullWidth 
                        variant="outlined" 
                        onClick={handleGameCreation}
                        className={classes.button}
                    >
                        Create a new Game
                    </Button>
                    <Typography variant="h6">
                        Or
                    </Typography>
                    <form onSubmit={formik.handleSubmit} className={classes.form}>
                        <TextField 
                            id="slug"
                            label="Slug"
                            name="slug"
                            required
                            fullWidth
                            onChange={formik.handleChange}
                            error={formik.touched.slug && Boolean(formik.errors.slug)}
                            helperText={formik.touched.slug && formik.errors.slug}
                            value={formik.values.slug}
                            variant="outlined"
                            style={{ marginBottom: 7 }}
                        />
                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="outlined"
                            className={classes.button}
                        >
                            Join a Room
                        </Button>
                    </form>
                    <Typography variant="h6">
                        Or
                    </Typography>
                    <Button 
                        fullWidth 
                        variant="outlined" 
                        onClick={() => history.push('/games')}
                        className={classes.button}
                    >
                        Check your games
                    </Button> 
                </div>}
            </div>
            {notification && <AppNotification notification={notification} />}
        </div>
    );
};

export default GameForm;