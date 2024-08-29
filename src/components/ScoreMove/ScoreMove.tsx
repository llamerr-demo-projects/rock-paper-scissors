import cn from 'classnames';
import { useTranslations } from 'next-intl';
import type React from 'react';
import tw from 'tailwind-styled-components';

import { NarrowText, NarrowTextTitle } from '@/components/NarrowText/NarrowText';
import { RoundButton } from '@/components/RoundButton/RoundButton';
import {
  ButtonSizes,
  type LongTurnsList,
  type ShortTurnsList,
} from '@/components/RoundButton/RoundButton.types';
import { GameOutcome } from '@/libs/RPSWinnerCalc';

const GridContainer = tw.div`
    grid 
    h-full
    [grid-template-areas:'tl_result_tr''bl_result_br'] 
    mobile:[grid-template-areas:'bl_br''tl_tr''result_result'] 
    grid-cols-[1fr_minmax(259px,1fr)_1fr] 
    grid-rows-[min-content_fit-content(10em)] 
    gap-4 
    mobile:grid-cols-[minmax(259px,1fr)_minmax(259px,1fr)] 
    items-center
`;

export type ScoreMoveProps = {
  playerMove: ShortTurnsList | LongTurnsList;
  computerMove: ShortTurnsList | LongTurnsList;
  winner: GameOutcome;
  onPlayAgain: React.MouseEventHandler<HTMLButtonElement>;
};

export const ScoreMove: React.FC<ScoreMoveProps> = ({
  playerMove,
  computerMove,
  winner,
  onPlayAgain,
}) => {
  const t = useTranslations('Game');
  const isPlayerWon = winner === GameOutcome.PLAYER;
  const isComputerWon = winner === GameOutcome.COMPUTER;
  const isDraw = winner === GameOutcome.DRAW;

  return (
    <GridContainer>
      <NarrowTextTitle className="z-20 [grid-area:tl]">
        {t('you_picked')}
      </NarrowTextTitle>
      <div className="z-20 row-span-2 mx-[min(2vh,2vw)] mt-16 flex min-w-52 flex-col items-center justify-center [grid-area:result] mobile:col-span-2 mobile:mt-0">
        <NarrowText className="text-nowrap pb-8 text-[min(6vh,6vw)] font-bold uppercase text-white">
          {isPlayerWon && t('you_win')}
          {isComputerWon && t('you_lose')}
          {isDraw && t('draw')}
        </NarrowText>
        <button
          type="button"
          className="min-w-full rounded-lg bg-white p-2 font-bold uppercase text-blue-900 hover:text-red-400"
          onClick={onPlayAgain}
        >
          {t('play_again')}
        </button>
      </div>
      <NarrowTextTitle className="z-20 [grid-area:tr]">
        {t('the_house_picked')}
      </NarrowTextTitle>
      <RoundButton
        type={playerMove}
        size={ButtonSizes.LARGE}
        styles={cn(isPlayerWon && 'shadow-triple', '[grid-area:bl] m-auto z-10')}
      />
      <RoundButton
        type={computerMove}
        size={ButtonSizes.LARGE}
        styles={cn(isComputerWon && 'shadow-triple', '[grid-area:br] m-auto z-10')}
      />
    </GridContainer>
  );
};
