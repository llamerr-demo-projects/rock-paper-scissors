import { type GameAction, GameStage, type GameState } from './Game.types';

export function gameReducer(state: GameState, action: GameAction): GameState {
  const { type, payload } = action;
  if (type === GameStage.INIT) {
    return {
      ...state,
      score: payload.score,
      gameType: payload.gameType,
      stage: GameStage.PLAYER_MOVE,
      playerMove: null,
      computerMove: null,
    };
  }
  if (type === GameStage.PLAYER_MOVE) {
    return {
      ...state,
      stage: GameStage.COMPUTER_MOVE,
      playerMove: payload.turn,
    };
  }
  if (type === GameStage.COMPUTER_MOVE) {
    return {
      ...state,
      stage: GameStage.SCORE,
      computerMove: payload.turn,
      winner: payload.winner,
      score: payload.score,
    };
  }
  if (type === GameStage.SCORE) {
    return {
      ...state,
    };
  }
  throw new Error('Unknown action.');
}
