import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    query SignIn($username: String!, $password: String!) {
        signIn(
            username: $username,
            password: $password
        ) {
            username
            token
            createdAt
            games {
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
    }
`;

export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            notifications {
                from {
                    username
                }
                message
            }
            username
            token
            createdAt
            status
            games {
                slug
                status
                createdAt
                inTurn {
                    player {
                        username
                    }
                    numberOfThrows
                }
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
                    selected
                    value
                }
                messages {
                    timestamp
                    message
                    user {
                        username
                    }
                }
            }
        }
    }
`;

export const GET_GAME = gql`
    query GetGame($slug: String!) {
        getGame(
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

export const GET_USER = gql`
    query GetUser($username: String!) {
        getUser(
            username: $username
        ) {
            username
            createdAt
            status
            games {
                slug
                status
                inTurn {
                    player {
                        username
                    }
                    numberOfThrows
                }
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
                    selected
                    value
                }
                messages {
                    timestamp
                    message
                    user {
                        username
                    }
                }
            }
        }
    }
`;

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        getAllUsers {
            username
            createdAt
            status
            games {
                slug
                status
                inTurn {
                    player {
                        username
                    }
                    numberOfThrows
                }
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
                    selected
                    value
                }
                messages {
                    timestamp
                    message
                    user {
                        username
                    }
                }
            }
        }
    }
`;

export const GET_ONLINE_USERS = gql`
    query GetOnlineUsers {
        getOnlineUsers {
            username
            createdAt
            status
            games {
                slug
                status
                inTurn {
                    player {
                        username
                    }
                    numberOfThrows
                }
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
                    selected
                    value
                }
                messages {
                    timestamp
                    message
                    user {
                        username
                    }
                }
            }
        }
    }
`;

export const GET_LOBBY = gql`
    query GetLobby {
        getLobby {
            users {
                username
            }
            messages {
                timestamp
                message
                user {
                    username
                }
            }
        }
    }
`;