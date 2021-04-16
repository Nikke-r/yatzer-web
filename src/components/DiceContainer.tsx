import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DiceType, GameStatus, InTurnPlayer, UserType } from '../types';
import Dice from './Dice';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
    },
    rollBtn: {
        height: 70
    }
}));

interface Props {
    dices: DiceType[];
    toggleDiceSelection: (diceIndex: number) => void;
    rollDices: () => void;
    user: UserType | undefined;
    inTurn: InTurnPlayer;
    status: GameStatus;
}

const DiceContainer: React.FC<Props> = ({ dices, toggleDiceSelection, rollDices, user, inTurn, status }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {dices.map((dice, index) => <Dice key={index} toggleDiceSelection={() => toggleDiceSelection(index)} dice={dice} />)}
                {inTurn.numberOfThrows < 3 && inTurn.player.username === user?.username && status !== GameStatus.Ended &&
                <Button 
                    variant="outlined"
                    className={classes.rollBtn}
                    onClick={rollDices}
                >
                    Roll!
                </Button>}
            </div>
        </div>
    );
};

export default DiceContainer;