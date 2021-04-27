import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { UserType } from '../types';

interface Props {
    user: UserType;
    size?: { width: number, height: number };
    newImage?: string;
}

const AvatarImage: React.FC<Props> = ({ user, size, newImage }) => {
    return (
        <Avatar alt={user.username} src={newImage ? newImage : user.avatarUrl} style={size} />
    );
};

export default AvatarImage;