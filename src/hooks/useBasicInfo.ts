import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_GAME_COUNT, GET_USER_COUNT } from "../graphql/queries";

interface GetUserCountQuery {
    getUserCount: number;
}

interface GetGameCountType {
    getGameCount: number;
}

const useBasicInfo = () => {
    const [registeredPlayers, setRegisteredPlayers] = useState<number>(0);
    const [gamesCreated, setGamesCreated] = useState<number>(0);
    const getUserCount = useQuery<GetUserCountQuery>(GET_USER_COUNT);
    const getGameCount = useQuery<GetGameCountType>(GET_GAME_COUNT);

    useEffect(() => {
        if (getUserCount && getUserCount.data) {
            setRegisteredPlayers(getUserCount.data.getUserCount);
        }
    }, [getUserCount]);

    useEffect(() => {
        if (getGameCount && getGameCount.data) {
            setGamesCreated(getGameCount.data.getGameCount);
        }
    }, [getGameCount]);

    return {
        registeredPlayers,
        gamesCreated,
    }
}

export default useBasicInfo;