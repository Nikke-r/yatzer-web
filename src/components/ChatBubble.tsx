import React from 'react';
import { ChatMessage } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import AvatarImage from './AvatarImage';

const useStyles = makeStyles(() => ({
    container: {
        overflow: 'hidden',
        padding: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        maxWidth: '100%',
        marginBottom: 5,
    },
    messageInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}));

interface Props {
    message: ChatMessage;
}

const ChatBubble: React.FC<Props> = ({ message }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.messageInfo}>
                <AvatarImage user={message.user} />
                <p style={{ marginLeft: 10 }}>{message.user.username} {new Date(message.timestamp).toDateString()}</p>
            </div>
            <p>
                {message.message}
            </p>
        </div>
    );
};

export default ChatBubble;