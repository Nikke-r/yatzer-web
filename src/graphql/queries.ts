import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    query SignIn($username: String!, $password: String!) {
        signIn(
            username: $username,
            password: $password
        ) {
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
        }
    }
`;

