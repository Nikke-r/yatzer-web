import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { POST_SCORE, ROLL_DICES, SEND_MESSAGE, SEND_NOTIFICATION, TOGGLE_DICE_SELECTION } from "../graphql/mutations";
import { GET_GAME } from "../graphql/queries";
import { GAME_DATA_CHANGED } from "../graphql/subscriptions";
import { GameType, NotificationTypes, ScoreboardRowName, SendMessageValues } from "../types";
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
    const [usersToInvite, setUsersToInvite] = useState<string[]>([]);
    const gameQuery = useQuery<GetGameType>(GET_GAME, { variables: { slug }, onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [toggleDiceSelectionMutation] = useMutation(TOGGLE_DICE_SELECTION, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [rollDicesMutation] = useMutation(ROLL_DICES, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [postScoreMutation] = useMutation(POST_SCORE, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [newMessageMutation] = useMutation(SEND_MESSAGE, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [joinGameInvitation] = useMutation(SEND_NOTIFICATION, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5)});
    useSubscription<GameDataChangedType>(GAME_DATA_CHANGED, { variables: { slug }, onSubscriptionData: ({ subscriptionData }) => setGame(subscriptionData.data?.gameDataChanged) });


    useEffect(() => {
        if (gameQuery && gameQuery.data) {
            setGame(gameQuery.data.getGame);
        }
    }, [gameQuery]);

    const toggleDiceSelection = async (diceIndex: number) => {
        await toggleDiceSelectionMutation({ variables: { slug, diceIndex }});
    }

    const rollDices = async () => {
        await rollDicesMutation({ variables: { slug }});
    }

    const postScore = async (rowName: ScoreboardRowName) => {
        await postScoreMutation({ variables: { slug, rowName }});
    }

    const sendMessage = async (message: SendMessageValues) => {
        await newMessageMutation({ variables: { slug, message: message.message }});
    }

    const handleUserSelection = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
            setUsersToInvite(usersToInvite.concat(event.target.name));
        } else {
            setUsersToInvite(usersToInvite.filter(name => name !== event.target.name));
        }
    }

    const handleGameInvitation = () => {
        joinGameInvitation({ variables: { type: NotificationTypes.GameInvitation, to: usersToInvite, slug }})
    }

    return {
        toggleDiceSelection,
        rollDices,
        postScore,
        sendMessage,
        game,
        gameLoading: gameQuery.loading,
        gameErrors: notification,
        handleUserSelection,
        handleGameInvitation,
    }
};

export default useGame;