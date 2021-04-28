import React from 'react';
import { GameStatus, Result } from '../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 500,
        height: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column'
      },
      divider: {
          borderWidth: 1,
          borderStyle: 'solid',
          width: '100%'
      },
      content: {
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 20,
      },
      buttonContainer: {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
      }
    }),
  );

interface Props {
    results: Result[];
    status: GameStatus;
}

const GameFinishedModal: React.FC<Props> = ({ results, status }) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Modal
            open={status === GameStatus.Ended}
        >
            <div className={classes.paper}>
                <Typography variant="h4" style={{ paddingBottom: 20 }}>
                    Results
                </Typography>
                <div className={classes.divider} />
                <div className={classes.content}>
                    <table style={{ flexGrow: 1 }}>
                        <thead>
                            <tr><th>Player</th><th>Score</th></tr>
                            {results.map(result => <tr><td>{result.player.username}</td><td>{result.score}</td></tr>)}
                        </thead>
                    </table>
                </div>
                <div className={classes.buttonContainer}>
                    <Button onClick={() => history.push('/')}>
                        Back to home!
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default GameFinishedModal;