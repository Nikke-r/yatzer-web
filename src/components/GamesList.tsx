import React, { useState } from 'react';
import { GameStatus, GameType } from '../types';
import GamesListItem from './GamesListItem';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBarSpacer from './AppBarSpacer';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
        maxHeight: '100vh',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 30
    },
    wrapper: {
        display: 'flex',
        maxHeight: '100vh'
    },
    content: {
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '50%'
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
                Your Games ({games.length})
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
                {games.length > 0 ?
                <div className={classes.content}>
                    {filteredGames().map(game => <GamesListItem key={game.createdAt} game={game} />)}
                </div>
                :
                <p style={{ paddingTop: 30 }}>You havent started or joined to any games yet!</p>}

        </div>
    );
};

export default GamesList;