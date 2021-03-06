import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DiceType, GameStatus, InTurnPlayer, UserType } from '../types';
import Dice from './Dice';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    },
    upper: {
        display: 'flex',
        flexDirection: 'row',
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
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (inTurn.numberOfThrows !== 0) {
            setIsAnimating(true);

            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }
    }, [inTurn.numberOfThrows]);

    return (
        <div className={classes.container}>
            <div className={classes.content}>  
                <div>
                    <AppBarSpacer />
                    {status !== GameStatus.Ended &&
                    <>
                        <Typography variant="h4" style={{ marginRight: 5 }}>
                            Current player: {inTurn.player.username} 
                        </Typography>
                        <Typography variant="h4" style={{ marginRight: 5 }}>
                            Number of throws: {inTurn.numberOfThrows}
                        </Typography>
                    </>}
                </div>
                <div className={classes.dices}>
                    {status === GameStatus.Created && inTurn.player.username === user?.username ?
                    <Typography variant="h5" style={{ textAlign: 'center' }}>
                        Start the game by rolling the dices using the button below!
                        <br />
                        <br />
                        Invite friends, share the room code to lobby or copy it by pressing the room code top left.
                        <br />
                        <br />
                        After you have started ne game, others can not join the game anymore.
                    </Typography>
                    :
                    status === GameStatus.Created ?
                    <Typography variant="h4" style={{ textAlign: 'center' }}>
                        Waiting for {inTurn.player.username} to start the game!
                    </Typography>
                    :
                    dices.map((dice, index) => <Dice rolling={isAnimating} key={index} dice={dice} toggleDiceSelection={() => toggleDiceSelection(index)} />)}
                </div>
                <Button 
                    variant="outlined"
                    className={classes.rollBtn}
                    onClick={rollDices}
                    disabled={
                        inTurn.numberOfThrows >= 3 
                        || inTurn.player.username !== user!.username 
                        || status === GameStatus.Ended 
                        || isAnimating
                    }
                >
                    {inTurn.numberOfThrows >= 3 && inTurn.player.username === user!.username ? 
                    'Place your score'
                    :
                    inTurn.numberOfThrows >= 3 ?
                    `Waiting for ${inTurn.player.username} to place the score`
                    :
                    inTurn.player.username !== user!.username ? 
                    'Not in turn'
                    :
                    status === GameStatus.Ended ? 
                    'Game has ended'
                    :
                    inTurn.rolling ? 
                    'Rolling'
                    :
                    'Roll dices'}
                </Button>
            </div>
        </div>
    );
};

export default DiceContainer;