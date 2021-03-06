import React, { ChangeEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBarSpacer from './AppBarSpacer';
import { CircularProgress, Tab, Tabs, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_MOST_WINS, GET_USERS_MOST_PLAYED_GAMES, GET_USERS_WITH_HIGHEST_SCORES } from '../graphql/queries';
import HiscoreList from './HiscoreList';
import Center from './Center';

const useStyles = makeStyles(() => ({
    container: {
        flexGrow: 1,
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: 30,
    }
}));

const Hiscores: React.FC = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const highestScores = useQuery(GET_USERS_WITH_HIGHEST_SCORES);
    const mostPlayedGames = useQuery(GET_USERS_MOST_PLAYED_GAMES);
    const mostWins = useQuery(GET_MOST_WINS);

    const handleValueChange = (event: ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <AppBarSpacer />
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
                    <Typography variant="h4">
                        Top Ten
                    </Typography>
                    <Tabs
                        value={tabValue}
                        onChange={handleValueChange}
                        style={{ alignSelf: 'center' }}
                    >
                        <Tab label="Highest Score" />
                        <Tab label="Most Games Played" />
                        <Tab label="Most wins" />
                    </Tabs>
                    {highestScores.loading || mostPlayedGames.loading || mostWins.loading ?
                        <Center>
                            <CircularProgress />
                        </Center>
                    :
                    highestScores.error || mostPlayedGames.error || mostWins.error ?
                        <p>Error</p>
                    :
                    tabValue === 0 ?
                    <HiscoreList type={tabValue} topTen={highestScores.data.highestScores} />
                    :
                    tabValue === 1 ?
                    <HiscoreList type={tabValue} topTen={mostPlayedGames.data.mostPlayedGames} />
                    :
                    tabValue === 2 &&
                    <HiscoreList type={tabValue} topTen={mostWins.data.mostWins} />}
                </div>
            </div>
        </div>
    );
};

export default Hiscores;