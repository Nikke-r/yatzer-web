import React, { ChangeEvent } from 'react';
import Modal from '@material-ui/core/Modal';
import { Scoreboard, UserType } from '../types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      transform: 'translate(-50%, -50%)'
    },
    divider: {
        borderWidth: 1,
        borderStyle: 'solid',
        width: '100%'
    }
  }),
);

interface Props {
    open: boolean;
    friends: UserType[];
    closeModal: () => void;
    handleUserSelection: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    handleGameInvitation: () => void;
    scoreboard: Scoreboard;
}

const InvitationModal: React.FC<Props> = ({ 
    open, 
    friends, 
    closeModal, 
    handleUserSelection, 
    handleGameInvitation,
    scoreboard
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <div className={classes.paper}>
                <Typography variant="h4" style={{ paddingBottom: 20 }}>
                    Choose Friends
                </Typography>
                <div className={classes.divider} />
                <FormControl style={{ padding: 20 }}>
                    <FormGroup>
                        {friends.map(friend => (
                            !scoreboard.find(column => column.player.username === friend.username) &&
                            <FormControlLabel 
                                color="primary"
                                control={<Checkbox onChange={handleUserSelection} name={friend.username} />}
                                label={friend.username}
                                key={friend.username}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
                <div style={{ position: 'absolute', bottom: 20 }}>
                    <Button variant="outlined" onClick={() => {
                        handleGameInvitation();
                        closeModal();
                    }}>
                        Send Invitation
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default InvitationModal;