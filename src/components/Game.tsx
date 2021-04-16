import React from 'react';
import { UserType } from '../types';
import { useLocation } from 'react-router';
import useGame from '../hooks/useGame';
import { makeStyles } from '@material-ui/core/styles';
import GameInfo from './GameInfo';
import Scoreboard from './Scoreboard';
import Chat from './Chat';
import Center from './Center';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '100vh'
    },
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
        gameLoading
    } = useGame(location.pathname.split('/')[2]);

    return (
        <div className={classes.container}>
            {gameLoading ?
            <Center>
                <CircularProgress />
            </Center>
            :
            game ?
            <>
                <GameInfo game={game} />
                <Scoreboard 
                    game={game}
                    toggleDiceSelection={toggleDiceSelection}
                    rollDices={rollDices}
                    postScore={postScore}
                    user={user}
                />
                <Chat 
                    messages={game.messages} 
                    sendMessage={sendMessage}
                />
            </>
            :
            <p>Error</p>}
        </div>
    );
};

export default Game;