import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation SignUp($username: String!, $password: String!) {
        signUp(
            username: $username,
            password: $password,
        ) {
            id
        }
    }
`;

export const CREATE_GAME = gql`
    mutation CreateGame {
        createGame {
            slug
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