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
                }
            }
            inTurn {
                player {
                    username
                }
                numberOfThrows
                rolling
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
