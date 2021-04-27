import React from 'react';
import { DiceType } from '../types';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dot:{
        display: 'block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        margin: 5,
        backgroundColor: theme.palette.type === 'dark' ? 'white' : 'black',
    },
    column: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    center: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    right: {
        alignItems: 'flex-end'
    },
    bottom: {
        justifyContent: 'flex-end'
    }
}));

interface Props {
    dice: DiceType;
    toggleDiceSelection: () => Promise<void>;
    rolling: boolean;
}

const Dice: React.FC<Props> = ({ dice, toggleDiceSelection, rolling }) => {
    const classes = useStyles();
    const variants = {
        initial: { y: 0 },
        animate: { y: -100 }
    }
    
    const rollVariant = {
        initial: { rotate: 0 },
        animate: { rotate: 360 }
    }
    return (
        <motion.div
            variants={rollVariant}
            initial="initial"
            animate={rolling && !dice.selected ? "animate" : "initial"}
            transition={{ duration: 1 }}
        >
            <motion.div 
                style={{
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 5,
                    display: 'flex',
                    userSelect: 'none',
                    cursor: 'pointer',
                    borderColor: dice.selected ? '#1f70f2' : ''
                }}
                initial="initial"
                animate={dice.selected ? 'animate' : 'initial'}
                variants={variants}
                whileHover={{ scale: 1.2 }}
                onClick={toggleDiceSelection}
            >
                {dice.value === 1 ?
                <div className={classes.center}>
                    <span className={classes.dot} />
                </div>
                :
                dice.value === 2 ?
                <>
                    <div className={classes.column}>
                        <span className={classes.dot} />
                    </div>
                    <div className={`${classes.column} ${classes.right} ${classes.bottom}`}>
                        <span className={classes.dot} />
                    </div>
                </>
                :
                dice.value === 3 ?
                <>
                    <div className={classes.column}>
                        <span className={classes.dot} />
                    </div>
                    <div className={classes.center}>
                        <span className={classes.dot} />
                    </div>
                    <div className={`${classes.column} ${classes.right} ${classes.bottom}`}>
                        <span className={classes.dot} />
                    </div>
                </>
                :
                dice.value === 4 ?
                <>
                    <div className={classes.column}>
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                    </div>
                    <div className={`${classes.column} ${classes.right}`}>
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                    </div>
                </>
                :
                dice.value === 5 ?
                <>
                    <div className={classes.column}>
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                    </div>
                    <div className={classes.center}>
                        <span className={classes.dot} />
                    </div>
                    <div className={`${classes.column} ${classes.right}`}>
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                    </div>
                </>
                :
                <>
                    <div className={classes.column}>
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                    </div>
                    <div className={`${classes.column} ${classes.right}`}>
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                        <span className={classes.dot} />
                    </div>
                </>}
            </motion.div>
        </motion.div>
    );
};

export default Dice;