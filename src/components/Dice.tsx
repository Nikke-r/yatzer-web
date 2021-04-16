import React from 'react';
import { DiceType } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5 ,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        tansform: 'translateZ(-100px)',
        transition: 'transform 5s'
    },
}));

interface Props {
    dice: DiceType;
    toggleDiceSelection: () => void;
}

const Dice: React.FC<Props> = ({ dice, toggleDiceSelection }) => {
    const classes = useStyles();

    const selectedStyle = {
        borderColor: dice.selected ? '#1f70f2' : ''
    }

    return (
        <div 
            className={classes.container} 
            style={selectedStyle}
            onClick={toggleDiceSelection}
        >
            {dice.value}
        </div>
    );
};

export default Dice;