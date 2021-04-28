import { gql } from '@apollo/client';

export const GAME_DATA_CHANGED = gql`
    subscription GameDataChanged($slug: String!) {
        gameDataChanged(
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
                rolling
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

export const USER_DATA_CHANGED = gql`
    subscription UserDataChanged($username: String!) {
        userDataChanged(
            username: $username
        ) {
            username
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
                finalResult {
                    player {
                        username
                    }
                    score
                }
            }
        }
    }
`;
