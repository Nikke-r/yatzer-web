import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GameType, ScoreboardRowName, UserType } from '../types';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
    },
    content: {
        flex: 1,
        display: 'flex',
    }
}));

interface Props {
    game: GameType | undefined;
    postScore: (rowName: ScoreboardRowName) => void;
    user: UserType;
}

const Scorecard: React.FC<Props> = ({ game, postScore, user }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {game &&
                <table>
                    <thead>
                        <tr>
                            <td />
                            {game.scoreboard.map(column => <td key={column.player.username}>{column.player.username}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(ScoreboardRowName).map((name, index) => (
                            <tr key={name}>
                                <td>{name.split(/(?=[A-Z])/).join(' ')}</td>
                                {game.scoreboard.map((column) => 
                                    <td 
                                        key={column.player.username}
                                        className={
                                            name === ScoreboardRowName.Sum 
                                            || name === ScoreboardRowName.Bonus 
                                            || name === ScoreboardRowName.Total 
                                            || column.rows[index].filled 
                                            || game.inTurn.numberOfThrows === 0 
                                            || column.player.username !== user.username
                                            ? 'centered' : 'selectable'
                                        } 
                                        onClick={
                                            column.rows[index].filled 
                                            || game.inTurn.numberOfThrows === 0 
                                            ? undefined : () => postScore(name)
                                        }
                                    > 
                                        {column.rows[index].filled ? column.rows[index].score : ''} 
                                    </td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    );
};

export default Scorecard;