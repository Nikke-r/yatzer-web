import React from 'react';
import Container from '@material-ui/core/Container';
import Center from './Center';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GameType, JoinGameValues, UserType } from '../types';
import Typography from '@material-ui/core/Typography';
import { Redirect, useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { CREATE_GAME, JOIN_GAME } from '../graphql/mutations';

const useStyles = makeStyles(() => ({
    content: {
        display: 'flex',
        flexDirection: 'inherit',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '50%'
    },
    form: {
        width: '100%'
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
    const [createGame] = useMutation<CreateGameResponse>(CREATE_GAME);
    const [joinGame] = useMutation<JoinGameResponse>(JOIN_GAME);
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
        <Container maxWidth="xs">
            <Center>
                {user ?
                <div className={classes.content}>
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
                        <Button type="submit" fullWidth variant="outlined">
                            Join a Room
                        </Button>
                    </form>
                    <Typography variant="h6">
                        Or
                    </Typography>
                    <Button fullWidth variant="outlined" onClick={() => history.push('/games')}>
                        Check your games
                    </Button>
                </div>
                :
                <Redirect to="/signIn" />}
            </Center>
        </Container>
    );
};

export default GameForm;