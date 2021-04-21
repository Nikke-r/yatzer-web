import React from 'react';
import { DiceType } from '../types';
import { motion } from 'framer-motion';

interface Props {
    dice: DiceType;
    toggleDiceSelection: () => void;
    rolling: boolean;
}

const Dice: React.FC<Props> = ({ dice, toggleDiceSelection, rolling }) => {
    const variants = {
        initial: { y: 0 },
        animate: { y: -100 }
    }
    
    return (
        <motion.div
            initial={{ rotate: 0 }}
            animate={rolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                style={{
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                {dice.value}
            </motion.div>
        </motion.div>
    );
};

export default Dice;