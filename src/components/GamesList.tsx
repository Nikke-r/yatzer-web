import React, { useState } from 'react';
import { GameStatus, GameType } from '../types';
import GamesListItem from './GamesListItem';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBarSpacer from './AppBarSpacer';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
        maxHeight: '100vh',
        alignItems: 'center',
        flexDirection: 'column',
    },
    wrapper: {
        display: 'flex',
        maxHeight: '100vh'
    },
    content: {
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%'
    }
}));


interface Props {
    games: GameType[];
}

const GamesList: React.FC<Props> = ({ games }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    const filteredGames = () => {
        if (value === 0) {
            return games;
        }

        if (value === 1) {
            return games.filter(game => game.status === GameStatus.Created);
        }

        if (value === 2) {
            return games.filter(game => game.status === GameStatus.Started);
        }

        if (value === 3) {
            return games.filter(game => game.status === GameStatus.Ended);
        }

        return games;
    }

    return (
        <div className={classes.container}>
            <AppBarSpacer />
            <Typography variant="h4">
                Your Games
            </Typography>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                <Tab label="All" />
                <Tab label="Created" />
                <Tab label="Running" />
                <Tab label="Ended" />
            </Tabs>
            <Container maxWidth="lg" className={classes.wrapper}>
                <div className={classes.content}>
                    {games.length > 0 ?
                    filteredGames().map(game => <GamesListItem game={game} />)
                    :
                    <p>You have not started or played any games yet!</p>}
                </div>
            </Container>
        </div>
    );
};

export default GamesList;