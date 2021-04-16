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
            username
            token
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

export const GET_GAME = gql`
    query GetGame($slug: String!) {
        getGame(
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