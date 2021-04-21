import React from 'react';
import { GameType } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        marginTop: 10,
    },
    content: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        display: 'flex'
    },
    info: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}));

interface Props {
    game: GameType;
}

const GamesListItem: React.FC<Props> = ({ game }) => {
    const classes = useStyles();
    return (
        <div className={classes.container} >
            <div className={classes.content}>
                <div className={classes.info}>
                    <p>Creation Date: {new Date(game.createdAt).toLocaleDateString()}</p>
                    <p >Number of players: {game.scoreboard.length}</p>
                    <p >Slug: {game.slug}</p>
                </div>
                <Button>
                    <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                        open game
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default GamesListItem;