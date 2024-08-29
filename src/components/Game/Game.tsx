'use client';

import localFont from 'next/font/local';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useReducer, useState } from 'react';

import { NarrowText } from '@/components/NarrowText/NarrowText';
import { PlayerMove } from '@/components/PlayerMove/PlayerMove';
import type {
  LongTurnsList,
  ShortTurnsList,
} from '@/components/RoundButton/RoundButton.types';
import { GameType } from '@/libs/RPS.types';
import determineWinner, { GameOutcome } from '@/libs/RPSWinnerCalc';

import { ComputerMove } from '../ComputerMove/ComputerMove';
import { RulesModal } from '../RulesModal/RulesModal';
import { ScoreMove } from '../ScoreMove/ScoreMove';
import { setGameType, setScore } from './Game.action';
import { gameReducer } from './Game.reducer';
import { GameStage } from './Game.types';
import LogoImageShort from './images/logo.svg';
import LogoImageLong from './images/logo-bonus.svg';

const numberFont = localFont({
  src: './fonts/Barlow-Bold.otf',
  display: 'swap',
});

export type GameProps = {
  score: number;
  gameType: GameType;
};

export const Game: React.FC<GameProps> = ({ score, gameType }) => {
  const t = useTranslations('Game');

  const [isOpen, setIsOpen] = useState(false);
  const showRulesModal = () => {
    setIsOpen(true);
  };

  const [state, dispatch] = useReducer(gameReducer, {
    gameType,
    score,
    stage: GameStage.PLAYER_MOVE,
    playerMove: null,
    computerMove: null,
    winner: null,
  });

  const onPlayerMoved = (selectedMove: ShortTurnsList | LongTurnsList) => {
    dispatch({ type: GameStage.PLAYER_MOVE, payload: { turn: selectedMove } });
  };

  const onComputerMoved = (selectedMove: ShortTurnsList | LongTurnsList) => {
    const winner = determineWinner(
      state.playerMove as ShortTurnsList | LongTurnsList,
      selectedMove,
      state.gameType,
    );
    let newScore = state.score;
    if (winner === GameOutcome.PLAYER) {
      newScore += 1;
    } else if (winner === GameOutcome.COMPUTER) {
      newScore -= 1;
    }
    setScore(newScore);
    dispatch({
      type: GameStage.COMPUTER_MOVE,
      payload: { turn: selectedMove, winner, score: newScore },
    });
  };

  const onPlayAgain = () => {
    dispatch({
      type: GameStage.INIT,
      payload: { score: state.score, gameType: state.gameType },
    });
  };

  const changeGameType = () => {
    const newGameType
      = state.gameType === GameType.SHORT ? GameType.LONG : GameType.SHORT;
    setGameType(newGameType);
    dispatch({
      type: GameStage.INIT,
      payload: {
        score: state.score,
        gameType: newGameType,
      },
    });
  };

  return (
    <div className="m-auto flex h-screen max-w-7xl flex-col items-center justify-center">
      <div className="flex w-full grow flex-col items-center justify-center mobile:mt-8 mobile:justify-between">
        <div className="z-20 flex w-8/12 items-center justify-between rounded-lg border-2 border-gray-400 p-4 mobile:w-11/12">
          <Image
            src={
              state.gameType === GameType.SHORT ? LogoImageShort : LogoImageLong
            }
            alt={t('logo')}
          />
          <div className="rounded-lg bg-white px-10 py-4 text-center leading-3">
            <NarrowText className="text-base uppercase tracking-wider text-blue-800">
              {t('score')}
            </NarrowText>
            <div
              className={`${numberFont.className} text-6xl font-bold text-gray-600`}
            >
              {state.score}
            </div>
          </div>
        </div>
        <div className="z-10 flex size-[min(70vh,70vw)] items-center justify-center mobile:m-[10%_auto_auto]">
          {state.stage === GameStage.PLAYER_MOVE && (
            <PlayerMove onMove={onPlayerMoved} gameType={state.gameType} />
          )}
          {state.stage === GameStage.COMPUTER_MOVE && (
            <ComputerMove
              playerMove={state.playerMove as LongTurnsList}
              gameType={state.gameType}
              onMove={onComputerMoved}
            />
          )}
          {state.stage === GameStage.SCORE && (
            <ScoreMove
              playerMove={state.playerMove as LongTurnsList}
              computerMove={state.computerMove as LongTurnsList}
              winner={state.winner as GameOutcome}
              onPlayAgain={onPlayAgain}
            />
          )}
        </div>
      </div>
      <div className="z-20 flex w-full shrink-0 grow-0 justify-between px-20 pb-5">
        <button
          type="button"
          className="rounded-lg border-2 bg-transparent p-2 text-white"
          onClick={changeGameType}
        >
          {t('change_game_type')}
        </button>
        <button
          type="button"
          className="rounded-lg border-2 bg-transparent px-8 py-2 uppercase text-white"
          onClick={showRulesModal}
        >
          {t('rules')}
        </button>
        <RulesModal
          gameType={state.gameType}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};
