import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DiceType, GameStatus, InTurnPlayer, UserType } from '../types';
import Dice from './Dice';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import AppBarSpacer from './AppBarSpacer';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    rollBtn: {
        height: 70,
        width: '100%',
        marginTop: 50
    },
    dices: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
    }
}));

interface Props {
    dices: DiceType[];
    toggleDiceSelection: (diceIndex: number) => Promise<void>;
    rollDices: () => Promise<void>;
    user: UserType | undefined;
    inTurn: InTurnPlayer;
    status: GameStatus;
}

const DiceContainer: React.FC<Props> = ({ dices, toggleDiceSelection, rollDices, user, inTurn, status }) => {
    const classes = useStyles();

    useEffect(() => {
        console.log(inTurn.rolling);
    }, [inTurn]);
    return (
        <div className={classes.container}>
            <div className={classes.content}>  
                <div>
                    <AppBarSpacer />
                    <Typography variant="h4">
                        Current player: {inTurn.player.username} 
                    </Typography>
                    <Typography>
                        Number of throws: {inTurn.numberOfThrows}
                    </Typography>
                </div>
                <div className={classes.dices}>
                    {dices.map((dice, index) => <Dice rolling={inTurn.rolling} key={index} dice={dice} toggleDiceSelection={() => toggleDiceSelection(index)} />)}
                </div>
                <Button 
                    variant="outlined"
                    className={classes.rollBtn}
                    onClick={rollDices}
                    disabled={inTurn.numberOfThrows >= 3 || inTurn.player.username !== user!.username || status === GameStatus.Ended}
                >
                    Roll dices!
                </Button>
            </div>
        </div>
    );
};

export default DiceContainer;