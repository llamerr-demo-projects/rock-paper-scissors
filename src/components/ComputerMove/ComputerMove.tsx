import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useTimeout } from 'usehooks-ts';

import { NarrowTextTitle } from '@/components/NarrowText/NarrowText';
import { RoundButton } from '@/components/RoundButton/RoundButton';
import type {
  ShortTurnsList,
} from '@/components/RoundButton/RoundButton.types';
import {
  ButtonSizes,
  LongTurnsList,
} from '@/components/RoundButton/RoundButton.types';
import { GameType } from '@/libs/RPS.types';

const MOVE_SPEED = 3000;
const DELAY_SPEED = 2000;

const GridContainer = tw.div`
    grid 
    h-full
    [grid-template-areas:'tl_result_tr''bl_result_br'] 
    mobile:[grid-template-areas:'bl_result_br''tl_result_tr'] 
    grid-cols-[minmax(259px,1fr)_105px_minmax(259px,1fr)] 
    grid-rows-[min-content_fit-content(10em)] 
    gap-4 
    mobile:grid-cols-[minmax(259px,1fr)_0px_minmax(259px,1fr)] 
    items-center
`;

export type ComputerMoveProps = {
  playerMove: ShortTurnsList | LongTurnsList;
  gameType: GameType;
  onMove: (type: ShortTurnsList | LongTurnsList) => void;
};

export const ComputerMove: React.FC<ComputerMoveProps> = ({
  playerMove,
  gameType,
  onMove,
}) => {
  const t = useTranslations('Game');
  const [computerMove, setComputerMove] = useState<
    ShortTurnsList | LongTurnsList | undefined
  >(undefined);

  const makeComputerMove = () => {
    const availableMoves = [
      LongTurnsList.ROCK,
      LongTurnsList.PAPER,
      LongTurnsList.SCISSORS,
      LongTurnsList.LIZARD,
      LongTurnsList.SPOCK,
    ];
    if (gameType === GameType.SHORT) {
      availableMoves.splice(3, 2);
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const randomMove = availableMoves[randomIndex] as
      | ShortTurnsList
      | LongTurnsList;
    setComputerMove(randomMove);
  };

  const onComputerMove = () => {
    if (computerMove !== undefined) {
      onMove(computerMove);
    }
  };

  useTimeout(makeComputerMove, MOVE_SPEED);
  useTimeout(onComputerMove, MOVE_SPEED + DELAY_SPEED);

  return (
    <GridContainer>
      <NarrowTextTitle className="[grid-area:tl]">
        {t('you_picked')}
      </NarrowTextTitle>
      <div className="row-span-2" />
      <NarrowTextTitle className="[grid-area:tr]">
        {t('the_house_picked')}
      </NarrowTextTitle>
      <RoundButton styles="[grid-area:bl] m-auto" type={playerMove} size={ButtonSizes.LARGE} />
      <RoundButton
        type={computerMove}
        size={ButtonSizes.LARGE}
        styles="[grid-area:br] m-auto"
      />
    </GridContainer>
  );
};
