export interface UserType {
    id: string;
    username: string;
    createdAt: number;
    games: GameType[];
    token?: string;
    notifications: Notifications[];
    avatarUrl: string;
    friends: UserType[];
    highestScore: number;
}

export interface Result {
    player: UserType;
    score: number;
}

export enum NotificationTypes {
    FriendRequest = "FriendRequest",
    GameInvitation = "GameInvitation",
}

export interface Notifications {
    id: string;
    from: UserType;
    type: NotificationTypes;
    slug?: string;
}

export enum ScoreboardRowName {
    Aces = 'Aces',
    Twos = 'Twos',
    Threes = 'Threes',
    Fours = 'Fours',
    Fives = 'Fives',
    Sixes = 'Sixes',
    Sum = 'Sum',
    Bonus = 'Bonus',
    Pair = 'Pair',
    TwoPairs = 'TwoPairs',
    ThreeOfKind = 'ThreeOfAKind',
    FourOfKind = 'FourOfAKind',
    SmallStraight = 'SmallStraight',
    LargeStraight = 'LargeStraight',
    Fullhouse = 'FullHouse',
    Chance = 'Chance',
    Yatzy = 'Yatzy',
    Total = 'Total'
}

export enum GameStatus {
    Created = 'created',
    Started = 'started',
    Ended = 'ended'
}

export interface ScoreboardRow {
    name: ScoreboardRowName;
    filled: boolean;
    score: number;
}

export interface ScoreboardColumn {
    player: UserType;
    rows: ScoreboardRow[];
}

export type Scoreboard = ScoreboardColumn[];

export interface DiceType {
    value: number;
    selected: boolean;
}

export interface InTurnPlayer {
    player: UserType;
    numberOfThrows: number;
    rolling: boolean;
}

export interface ChatMessage {
    timestamp: number;
    user: UserType;
    message: string;
}

export interface GameType {
    slug: string;
    scoreboard: Scoreboard;
    dices: DiceType[];
    inTurn: InTurnPlayer;
    status: GameStatus;
    messages: ChatMessage[];
    createdAt: number;
    finalResult: Result[];
}

export interface SignUpValues {
    username: string;
    password: string;
    confirmPassword: string;
}

export type SignInValues = Omit<SignUpValues, 'confirmPassword'>;

export interface JoinGameValues {
    slug: string;
}

export interface SendMessageValues {
    message: string;
}

export interface TopTen {
    name: string;
    amount: number;
}

export interface LobbyType {
    users: UserType[];
    messages: ChatMessage[];
    name: string;
}