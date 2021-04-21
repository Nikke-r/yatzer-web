import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DiceContainer from './DiceContainer';
import Scorecard from './Scorecard';
import AppBarSpacer from './AppBarSpacer';
import { GameType, ScoreboardRowName, UserType } from '../types';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    container: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        padding: 30,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    }
}));

interface Props {
    game: GameType | undefined;
    toggleDiceSelection: (diceIndex: number) => void;
    rollDices: () => void;
    postScore: (rowName: ScoreboardRowName) => void;
    user: UserType | undefined;
}

const Scoreboard: React.FC<Props> = ({ game, toggleDiceSelection, rollDices, postScore, user }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <AppBarSpacer />
            {game &&
            <div className={classes.content}>
                <Typography variant="h4">
                    Scoreboard
                </Typography>
                <Scorecard 
                    game={game} 
                    postScore={postScore}
                    user={user!}
                />
                <DiceContainer 
                    toggleDiceSelection={toggleDiceSelection} 
                    rollDices={rollDices} 
                    dices={game.dices} 
                    inTurn={game.inTurn}
                    user={user}
                    status={game.status}
                />
            </div>
            }
        </div>
    );
};

export default Scoreboard;