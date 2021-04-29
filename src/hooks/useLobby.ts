import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react"
import { ADD_USER_TO_LOBBY, REMOVE_USER_FROM_LOBBY, SEND_MESSAGE_TO_LOBBY } from "../graphql/mutations";
import { GET_LOBBY } from "../graphql/queries";
import { LOBBY_DATA_CHANGED } from "../graphql/subscriptions";
import { LobbyType, SendMessageValues } from "../types";
import useAppNotifications from "./useAppNotifications";

interface GetLobbyQuery {
    getLobby: LobbyType;
}

const useLobby = (username: string) => {
    const { notification, handleNotification } = useAppNotifications();
    const [lobby, setLobby] = useState<LobbyType>();
    const getLobby = useQuery<GetLobbyQuery>(GET_LOBBY);
    const [addUserToLobby] = useMutation(ADD_USER_TO_LOBBY, { variables: { username }, onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [removeUserFromLobby] = useMutation(REMOVE_USER_FROM_LOBBY, { variables: { username }, onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) });
    const [sendMessageToLobby] = useMutation(SEND_MESSAGE_TO_LOBBY, { onError: ({ graphQLErrors }) => handleNotification((graphQLErrors[0].message || 'Something went wrong'), 5) })
    useSubscription(LOBBY_DATA_CHANGED, { onSubscriptionData: ({ subscriptionData }) => setLobby(subscriptionData.data.lobbyDataChanged)});

    window.onbeforeunload = () => {
        removeUserFromLobby();
    };

    useEffect(() => {
        if (lobby && !lobby.users.find(user => user.username === username)) {
            addUserToLobby();
        }
    }, [lobby]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (getLobby.data) {
            setLobby(getLobby.data.getLobby);
        }
    }, [getLobby]);

    const handleMessageSending = (values: SendMessageValues) => {
        sendMessageToLobby({ variables: { ...values } });
    }

    return {
        lobby,
        notification,
        loading: getLobby.loading,
        handleMessageSending,
        removeUserFromLobby,
    }
};

export default useLobby;