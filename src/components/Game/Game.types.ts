import type { LongTurnsList, ShortTurnsList } from '@/components/RoundButton/RoundButton.types';
import type { GameType } from '@/libs/RPS.types';
import type { GameOutcome } from '@/libs/RPSWinnerCalc';

export enum GameStage {
  INIT = 0,
  PLAYER_MOVE = 1,
  COMPUTER_MOVE = 2,
  SCORE = 3,
}

export type GameState = {
  gameType: GameType;
  score: number;
  stage: GameStage;
  playerMove: ShortTurnsList | LongTurnsList | null;
  computerMove: ShortTurnsList | LongTurnsList | null;
  winner: GameOutcome | null;
};

export type GameAction =
  | {
    type: GameStage.INIT;
    payload: { score: number; gameType: GameType };
  }
  | {
    type: GameStage.PLAYER_MOVE;
    payload: { turn: ShortTurnsList | LongTurnsList };
  }
  | {
    type: GameStage.COMPUTER_MOVE;
    payload: {
      turn: ShortTurnsList | LongTurnsList;
      winner: GameOutcome;
      score: number;
    };
  }
  | {
    type: GameStage.SCORE;
    payload: null;
  };
