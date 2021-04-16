import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GameType, InTurnPlayer, ScoreboardRowName } from '../types';

const useStyles = makeStyles(() => ({
    container: {
        flex: 4,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

interface Props {
    game: GameType | undefined;
    postScore: (rowName: ScoreboardRowName) => void;
    inTurn: InTurnPlayer;
}

const Scorecard: React.FC<Props> = ({ game, postScore, inTurn }) => {
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
                            <tr>
                                <td key={name}>{name.split(/(?=[A-Z])/).join(' ')}</td>
                                {game.scoreboard.map((column) => 
                                    <td 
                                        className={
                                            name === ScoreboardRowName.Sum 
                                            || name === ScoreboardRowName.Bonus 
                                            || name === ScoreboardRowName.Total 
                                            || column.rows[index].filled 
                                            || inTurn.numberOfThrows === 0 
                                            ? 'centered' : 'selectable'
                                        } 
                                        key={index}
                                        onClick={
                                            column.rows[index].filled 
                                            || inTurn.numberOfThrows === 0 
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