import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBarSpacer from './AppBarSpacer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Telegram from '@material-ui/icons/Telegram';
import { ChatMessage, SendMessageValues } from '../types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ChatBubble from './ChatBubble';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
        maxHeight: '100vh',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: 30,
    },
    wrapper: {
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
    },
    form: {
        display: 'flex',
        width: '100%',
        marginTop: 10
    },
    inputField: {
        flexGrow: 1,
    }
}));

const validationSchema = Yup.object({
    message: Yup.string().min(2).max(50).required('This field cannot be empty')
});

const initialValues: SendMessageValues = {
    message: ''
};

interface Props {
    messages: ChatMessage[];
    sendMessage: (message: SendMessageValues) => void;
}

const Chat: React.FC<Props> = ({ messages, sendMessage }) => {
    const chatBottomRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            sendMessage(values);
            formik.values.message = '';
        }
    });

    useEffect(() => {
        if (chatBottomRef.current) {
            chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className={classes.container}>
            <div className={classes.content}>     
                <AppBarSpacer />
                <Typography variant="h4" style={{ paddingBottom: 20 }}>
                    Chat
                </Typography>
                <div className={classes.wrapper}>
                    {messages.length > 0 ?
                    messages.map(message => <ChatBubble key={message.timestamp} message={message} />)
                    :
                    <p>No messages</p>}
                    <div ref={chatBottomRef} />
                </div>
                <div>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <TextField 
                        id="message"
                        name="message"
                        value={formik.values.message}
                        label="Message"
                        onChange={formik.handleChange}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        required
                        variant="outlined"
                        className={classes.inputField}
                    />
                    <IconButton type="submit">
                        <Telegram />
                    </IconButton>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;