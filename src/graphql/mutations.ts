import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation SignUp($username: String!, $password: String!) {
        signUp(
            username: $username,
            password: $password
        ) {
            id
        }
    }
`;

export const CREATE_GAME = gql`
    mutation CreateGame {
        createGame {
            slug
            createdAt
            scoreboard {
                player {
                    username
                }
                rows {
                    name
                    filled
                    score
                }
            }
            dices {
                value
                selected
            }
            status
            messages {
                timestamp
                message
                user {
                    username
                    avatarUrl
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
        }
    }
`;

export const JOIN_GAME = gql`
    mutation JoinGame($slug: String!) {
        joinGame(
            slug: $slug
        ) {
            slug
            createdAt
            scoreboard {
                player {
                    username
                }
                rows {
                    name
                    filled
                    score
                }
            }
            dices {
                value
                selected
            }
            status
            messages {
                timestamp
                message
                user {
                    username
                    avatarUrl
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
        }
    }
`;

export const TOGGLE_DICE_SELECTION = gql`
    mutation ToggleDiceSelection($slug: String!, $diceIndex: Int!) {
        toggleDiceSelection (
            slug: $slug,
            diceIndex: $diceIndex
        ) {
            slug
            createdAt
            scoreboard {
                player {
                    username
                }
                rows {
                    name
                    filled
                    score
                }
            }
            dices {
                value
                selected
            }
            status
            messages {
                timestamp
                message
                user {
                    username
                    avatarUrl
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
        }
    }
`;

export const ROLL_DICES = gql`
    mutation RollDices($slug: String!) {
        rollDices(
            slug: $slug
        ) {
            slug
            createdAt
            scoreboard {
                player {
                    username
                }
                rows {
                    name
                    filled
                    score
                }
            }
            dices {
                value
                selected
            }
            status
            messages {
                timestamp
                message
                user {
                    username
                    avatarUrl
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
        }
    }
`;

export const POST_SCORE = gql`
    mutation PostScore($slug: String!, $rowName: ScoreboardRowName!) {
        postScore(
            slug: $slug,
            rowName: $rowName
        ) {
            slug
            createdAt
            scoreboard {
                player {
                    username
                }
                rows {
                    name
                    filled
                    score
                }
            }
            dices {
                value
                selected
            }
            status
            messages {
                timestamp
                message
                user {
                    username
                    avatarUrl
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation NewMessage($slug: String!, $message: String!) {
        newMessage(
            slug: $slug,
            message: $message
        ) {
            slug
            createdAt
            scoreboard {
                player {
                    username
                }
                rows {
                    name
                    filled
                    score
                }
            }
            dices {
                value
                selected
            }
            status
            messages {
                timestamp
                message
                user {
                    username
                    avatarUrl
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
        }
    }
`;

export const SEND_NOTIFICATION = gql`
    mutation SendNotification($type: NotificationTypes!, $to: [String!]!, $slug: String) {
        sendNotification(
            type: $type,
            to: $to,
            slug: $slug
        ) {
            username
        }
    }
`;

export const DISMISS_NOTIFICATION = gql`
    mutation DismissNotification($id: ID!) {
        dismissNotification(
            id: $id
        ) {
            username
        }
    }
`;

export const ADD_PROFILE_PICTURE = gql`
    mutation AddProfilePicture($file: Upload!) {
        addProfilePicture(
            file: $file
        ) {
            url
        }
    }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
    mutation AcceptFriendRequest($id: ID!) {
        acceptFriendRequest(
            id: $id
        ) {
            username
        }
    }
`;

export const ADD_USER_TO_LOBBY = gql`
    mutation AddUserToLobby($username: String!) {
        addUserToLobby(
            username: $username
        ) {
            name
        }
    }
`;

export const REMOVE_USER_FROM_LOBBY = gql`
    mutation RemoveUserFromLobby($username: String!) {
        removeUserFromLobby(
            username: $username
        ) {
            name
        }
    }
`;

export const SEND_MESSAGE_TO_LOBBY = gql`
    mutation SendMessageToLobby($message: String!) {
        sendMessageToLobby(
            message: $message
        ) {
            name
        }
    }
`;