import { gql } from '@apollo/client';

export const GAME_DATA_CHANGED = gql`
    subscription GameDataChanged($slug: String!) {
        gameDataChanged(
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

export const USER_DATA_CHANGED = gql`
    subscription UserDataChanged($username: String!) {
        userDataChanged(
            username: $username
        ) {
            username
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