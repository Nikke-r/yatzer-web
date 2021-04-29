import React from 'react';
import { TopTen } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
        paddingTop: 30,
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    }
}));

interface Props {
    topTen: TopTen[];
    type: 0 | 1 | 2;
}

const HiscoreList: React.FC<Props> = ({ topTen, type }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <table style={{ width: '50%' }}>
                    <thead>
                        <tr>
                            <th style={{ width: 250 }}>Player</th>
                            <th style={{ width: 250 }}>{type === 0 ? 'Score' : type === 1 ? 'Games' : 'Wins'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topTen.map(user => (
                            <tr key={user.name}>
                                <td style={{ textAlign: 'center' }}>{user.name}</td>
                                <td style={{ textAlign: 'center' }}>{user.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HiscoreList;