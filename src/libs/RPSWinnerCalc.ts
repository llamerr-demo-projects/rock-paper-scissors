import {
  LongTurnsList,
  ShortTurnsList,
} from '@/components/RoundButton/RoundButton.types';

import { GameType } from './RPS.types';

export enum GameOutcome {
  PLAYER = 'player',
  COMPUTER = 'computer',
  DRAW = 'draw',
}

// type DeepNestedObject<K extends string, T> = {
//   [key in K]: T | DeepNestedObject<K, T>;
// };

// fixed types detection for MOVES_SHORT[playerMove][computerMove] or MOVES_LONG[playerMove][computerMove]
// this works, but doesn't it denies whole purpose of type safety, when I manually cast recursive lenght?
// there are solutions to limit recursive lenght, but they will complicate code
// https://stackoverflow.com/questions/60168740/typescript-recursive-type-with-particular-depth
// return mode === 'short'
//   ? ((
//       MOVES_SHORT[playerMove as ShortTurnsList] as DeepNestedObject<
//         ShortTurnsList,
//         GameOutcome
//       >
//     )[computerMove as ShortTurnsList] as GameOutcome)
//   : ((MOVES_LONG[playerMove] as DeepNestedObject<LongTurnsList, GameOutcome>)[
//       computerMove
//     ] as GameOutcome);

type AvailableMoves<K extends string> = {
  [playerMove in K]: {
    [computerMove in K]: GameOutcome;
  };
};

// playerMove, computerMove, result
const MOVES_SHORT: AvailableMoves<ShortTurnsList> = {
  [ShortTurnsList.ROCK]: {
    [ShortTurnsList.ROCK]: GameOutcome.DRAW,
    [ShortTurnsList.PAPER]: GameOutcome.COMPUTER,
    [ShortTurnsList.SCISSORS]: GameOutcome.PLAYER,
  },
  [ShortTurnsList.PAPER]: {
    [ShortTurnsList.ROCK]: GameOutcome.PLAYER,
    [ShortTurnsList.PAPER]: GameOutcome.DRAW,
    [ShortTurnsList.SCISSORS]: GameOutcome.COMPUTER,
  },
  [ShortTurnsList.SCISSORS]: {
    [ShortTurnsList.ROCK]: GameOutcome.COMPUTER,
    [ShortTurnsList.PAPER]: GameOutcome.PLAYER,
    [ShortTurnsList.SCISSORS]: GameOutcome.DRAW,
  },
};

// playerMove, computerMove, result
const MOVES_LONG: AvailableMoves<LongTurnsList> = {
  [LongTurnsList.ROCK]: {
    [LongTurnsList.ROCK]: GameOutcome.DRAW,
    [LongTurnsList.PAPER]: GameOutcome.COMPUTER,
    [LongTurnsList.SCISSORS]: GameOutcome.PLAYER,
    [LongTurnsList.LIZARD]: GameOutcome.PLAYER,
    [LongTurnsList.SPOCK]: GameOutcome.COMPUTER,
  },
  [LongTurnsList.PAPER]: {
    [LongTurnsList.ROCK]: GameOutcome.PLAYER,
    [LongTurnsList.PAPER]: GameOutcome.DRAW,
    [LongTurnsList.SCISSORS]: GameOutcome.COMPUTER,
    [LongTurnsList.LIZARD]: GameOutcome.COMPUTER,
    [LongTurnsList.SPOCK]: GameOutcome.PLAYER,
  },
  [LongTurnsList.SCISSORS]: {
    [LongTurnsList.ROCK]: GameOutcome.COMPUTER,
    [LongTurnsList.PAPER]: GameOutcome.PLAYER,
    [LongTurnsList.SCISSORS]: GameOutcome.DRAW,
    [LongTurnsList.LIZARD]: GameOutcome.PLAYER,
    [LongTurnsList.SPOCK]: GameOutcome.COMPUTER,
  },
  [LongTurnsList.LIZARD]: {
    [LongTurnsList.ROCK]: GameOutcome.COMPUTER,
    [LongTurnsList.PAPER]: GameOutcome.PLAYER,
    [LongTurnsList.SCISSORS]: GameOutcome.COMPUTER,
    [LongTurnsList.LIZARD]: GameOutcome.DRAW,
    [LongTurnsList.SPOCK]: GameOutcome.PLAYER,
  },
  [LongTurnsList.SPOCK]: {
    [LongTurnsList.ROCK]: GameOutcome.PLAYER,
    [LongTurnsList.PAPER]: GameOutcome.COMPUTER,
    [LongTurnsList.SCISSORS]: GameOutcome.PLAYER,
    [LongTurnsList.LIZARD]: GameOutcome.COMPUTER,
    [LongTurnsList.SPOCK]: GameOutcome.DRAW,
  },
};

export default function determineWinner(
  playerMove: ShortTurnsList | LongTurnsList,
  computerMove: ShortTurnsList | LongTurnsList,
  mode: GameType = GameType.SHORT,
): GameOutcome {
  return mode === GameType.SHORT
    ? MOVES_SHORT[playerMove as ShortTurnsList][computerMove as ShortTurnsList]
    : MOVES_LONG[playerMove][computerMove];
}
