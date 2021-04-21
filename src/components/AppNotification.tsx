import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

interface Props {
    notification: string ;
}

const AppNotification: React.FC<Props> = ({ notification }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={Boolean(notification)}
        >
            <p>
                {notification}
            </p>
        </Snackbar>
    );
};

export default AppNotification;