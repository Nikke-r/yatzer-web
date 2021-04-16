export interface UserType {
    username: string;
    createdAt: number;
    games: GameType[];
    token?: string;
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