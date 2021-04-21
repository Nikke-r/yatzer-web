import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GameType } from '../types';
import Typography from '@material-ui/core/Typography';
import AppBarSpacer from './AppBarSpacer';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
    },
    content: { 
        padding: 30,
    }
}));

interface Props {
    game: GameType | undefined;
}

const GameInfo: React.FC<Props> = ({ game }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <AppBarSpacer />
            <div className={classes.content}>
                <Typography variant="h4">
                    Game Info
                </Typography>
                <Typography variant="body1">
                    Room Code: {game?.slug}
                </Typography>
                <Typography variant="body1">
                    Satus: {game?.status}
                </Typography>
                <Typography variant="body1">
                    In turn: {game?.inTurn.player.username}
                </Typography>
                <Typography variant="body1">
                    Number of throws: {game?.inTurn.numberOfThrows}
                </Typography>
            </div>
        </div>
    );
};

export default GameInfo;