import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    query SignIn($username: String!, $password: String!) {
        signIn(
            username: $username,
            password: $password
        ) {
            id
            username
            token
            avatarUrl
            createdAt
            friends {
                username
                avatarUrl
            }
            notifications {
                from {
                    username
                    avatarUrl
                }
                type
                id
                slug
            }
            games {
                id
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
                inTurn {
                    player {
                        username
                    }
                    numberOfThrows
                }
                status
                createdAt
                messages {
                    user {
                        username
                    }
                    message
                    timestamp
                }
            }
        }
    }
`;

export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            id
            username
            avatarUrl
            createdAt
            friends {
                username
                avatarUrl
            }
            notifications {
                id
                from {
                    username
                    avatarUrl
                }
                type
                slug
            }
            games {
                id
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
                inTurn {
                    player {
                        username
                    }
                    numberOfThrows
                }
                status
                createdAt
                messages {
                    user {
                        username
                    }
                    message
                    timestamp
                }
            }
        }
    }
`;

export const GET_ALL_USERS = gql`
    query GetAllUsers($username: String!) {
        getAllUsers(
            username: $username
        ) {
            avatarUrl
            username
        }
    }
`;

export const GET_GAME = gql`
    query GetGame($slug: String!) {
        getGame(
            slug: $slug
        ) {
            id
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
            inTurn {
                player {
                    username
                }
                numberOfThrows
            }
            status
            createdAt
            messages {
                user {
                    username
                }
                message
                timestamp
            }
            finalResult {
                player {
                    username
                }
                score
            }
        }
    }
`;

export const GET_GAME_COUNT = gql`
    query GetGameCount {
        getGameCount 
    }
`;

export const GET_USER_COUNT = gql`
    query GetUserCount {
        getUserCount 
    }
`;

export const GET_USERS_MOST_PLAYED_GAMES = gql`
    query MostPlayedGames {
        mostPlayedGames {
            name
            amount
        }
    }
`;

export const GET_USERS_WITH_HIGHEST_SCORES = gql`
    query HighestScores {
        highestScores {
            name
            amount
        }
    }
`;

export const GET_MOST_WINS = gql`
    query MostWins {
        mostWins {
            name
            amount
        }
    }
`;

export const GET_LOBBY = gql`
    query GetLobby {
        getLobby {
            users {
                username
            }
            name
            messages {
                user {
                    username
                }
                message
                timestamp
            }
        }
    }
`;