import React from 'react';
import { UserType } from '../types';
import { useLocation } from 'react-router';
import useGame from '../hooks/useGame';
import { makeStyles } from '@material-ui/core/styles';
import Chat from './Chat';
import Center from './Center';
import { CircularProgress, Typography } from '@material-ui/core';
import Scorecard from './Scorecard';
import DiceContainer from './DiceContainer';
import AppBarSpacer from './AppBarSpacer';
import AppNotification from './AppNotification';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        maxHeight: '100vh',
    },
    left: {
        flex: 1,
        padding: 30,
        display: 'flex',
        flexDirection: 'column'
    },
    center: {
        flex: 2,
        padding: 30,
        display: 'flex'
    },
    right: {
        flex: 1,
        display: 'flex'
    }
}));

interface Props {
    user: UserType | undefined;
}

const Game: React.FC<Props> = ({ user }) => {
    const classes = useStyles();
    const location = useLocation();
    const { 
        game, 
        toggleDiceSelection, 
        rollDices,
        postScore,
        sendMessage,
        gameLoading,
        gameErrors
    } = useGame(location.pathname.split('/')[2]);

    return (
        <div className={classes.container}>
            {gameLoading ?
            <Center>
                <CircularProgress />
            </Center>
            :
            game &&
            <>
                <div className={classes.left}>
                    <AppBarSpacer />
                    <Typography variant="h4" style={{ paddingBottom: 20 }}>
                        Room Code: {game.slug}
                    </Typography>
                    <Scorecard 
                        game={game}
                        postScore={postScore}
                        user={user!}
                    />
                </div>
                <div className={classes.center}>
                    <DiceContainer
                        dices={game.dices}
                        status={game.status}
                        inTurn={game.inTurn}
                        user={user}
                        toggleDiceSelection={toggleDiceSelection}
                        rollDices={rollDices}
                    />
                </div>
                <div  className={classes.right}>
                    <Chat
                        messages={game.messages}
                        sendMessage={sendMessage}
                    />
                </div>
            </>}
            {gameErrors && <AppNotification notification={gameErrors} />}
        </div>
    );
};

export default Game;