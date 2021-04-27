import React, { useState } from 'react';
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
import GameMenu from './GameMenu';
import InvitationModal from './InvitationModal';

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
    const [invitationModalOpen, setInvitationModalOpen] = useState(false);
    const classes = useStyles();
    const location = useLocation();
    const { 
        game, 
        toggleDiceSelection, 
        rollDices,
        postScore,
        sendMessage,
        gameLoading,
        gameErrors,
        handleUserSelection,
        handleGameInvitation
    } = useGame(location.pathname.split('/')[2]);

    const openModal = () => setInvitationModalOpen(true);
    const closeModal = () => setInvitationModalOpen(false);

    return (
        <div className={classes.container}>
            {gameLoading ?
            <Center>
                <CircularProgress />
            </Center>
            :
            game && user &&
            <>
                <div className={classes.left}>
                    <AppBarSpacer />
                    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 20 }}>
                    <Typography variant="h4" style={{ marginRight: 5 }}>
                        Room Code: 
                    </Typography>
                    <GameMenu 
                        slug={game.slug}
                        openModal={openModal}
                        status={game.status}
                    />
                    </div>
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
                <InvitationModal 
                    open={invitationModalOpen} 
                    closeModal={closeModal} 
                    friends={user.friends} 
                    handleUserSelection={handleUserSelection}
                    handleGameInvitation={handleGameInvitation}
                    scoreboard={game.scoreboard}
                />
            </>}
            {gameErrors && <AppNotification notification={gameErrors} />}
        </div>
    );
};

export default Game;