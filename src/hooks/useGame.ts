import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { POST_SCORE, ROLL_DICES, SEND_MESSAGE, TOGGLE_DICE_SELECTION } from "../graphql/mutations";
import { GET_GAME } from "../graphql/queries";
import { GAME_DATA_CHANGED } from "../graphql/subscriptions";
import { GameType, ScoreboardRowName, SendMessageValues } from "../types";
import useAppNotifications from "./useAppNotifications";

interface GetGameType {
    getGame: GameType
}

interface GameDataChangedType {
    gameDataChanged: GameType;
}

const useGame = (slug: string) => {
    const { handleNotification, notification } = useAppNotifications();
    const [game, setGame] = useState<GameType>();
    const gameQuery = useQuery<GetGameType>(GET_GAME, { variables: { slug }, onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5) });
    const [toggleDiceSelectionMutation] = useMutation(TOGGLE_DICE_SELECTION, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5) });
    const [rollDicesMutation] = useMutation(ROLL_DICES, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5) });
    const [postScoreMutation] = useMutation(POST_SCORE, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5) });
    const [newMessageMutation] = useMutation(SEND_MESSAGE, { onError: ({ graphQLErrors }) => handleNotification(graphQLErrors[0].message, 5) });
    useSubscription<GameDataChangedType>(GAME_DATA_CHANGED, { variables: { slug }, onSubscriptionData: ({ subscriptionData }) => setGame(subscriptionData.data?.gameDataChanged) });


    useEffect(() => {
        if (gameQuery && gameQuery.data) {
            setGame(gameQuery.data.getGame);
        }
    }, [gameQuery]);

    const toggleDiceSelection = (diceIndex: number) => {
        toggleDiceSelectionMutation({ variables: { slug, diceIndex }});
    }

    const rollDices = () => {
        rollDicesMutation({ variables: { slug }});
    }

    const postScore = (rowName: ScoreboardRowName) => {
        postScoreMutation({ variables: { slug, rowName }});
    }

    const sendMessage = (message: SendMessageValues) => {
        newMessageMutation({ variables: { slug, message: message.message }});
    }

    return {
        toggleDiceSelection,
        rollDices,
        postScore,
        sendMessage,
        game,
        gameLoading: gameQuery.loading,
        gameErrors: notification
    }
};

export default useGame;