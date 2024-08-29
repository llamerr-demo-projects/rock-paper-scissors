import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type React from 'react';

import { RoundButton } from '@/components/RoundButton/RoundButton';
import {
  ButtonSizes,
  LongTurnsList,
  ShortTurnsList,
} from '@/components/RoundButton/RoundButton.types';
import { GameType } from '@/libs/RPS.types';

import BgPentagon from './bg-pentagon.svg';
import BgTriangle from './bg-triangle.svg';

// TODO: good enough, but should be calc(centerOfTrianglePoint +/- RadiusOfMediumButton)
const shortTypeStyles: Record<ShortTurnsList, string> = {
  [ShortTurnsList.PAPER]:
    'absolute left-[min(-4.5vh,-4.5vw)] top-[min(-4.5vh,-4.5vw)]',
  [ShortTurnsList.SCISSORS]:
    'absolute right-[min(-4.5vh,-4.5vw)] top-[min(-4.5vh,-4.5vw)]',
  [ShortTurnsList.ROCK]:
    'absolute bottom-[min(-4.5vh,-4.5vw)] left-1/2 -translate-x-1/2',
};

// TODO: good enough, but should be calc(centerOfPentagonPoint +/- RadiusOfSmallButton)
const longTypeStyles: Record<LongTurnsList, string> = {
  [LongTurnsList.PAPER]:
    'absolute right-[min(-2.5vh,-2.5vw)] top-[min(5.5vh,5.5vw)]',
  [LongTurnsList.SCISSORS]:
    'absolute left-1/2 -translate-x-1/2 top-[min(-4.5vh,-4.5vw)]',
  [LongTurnsList.ROCK]:
    'absolute bottom-[min(-3.5vh,-3.5vw)] right-[min(-0.5vh,-0.5vw)]',
  [LongTurnsList.LIZARD]:
    'absolute bottom-[min(-3.5vh,-3.5vw)] left-[min(-0.5vh,-0.5vw)]',
  [LongTurnsList.SPOCK]:
    'absolute left-[min(-2.5vh,-2.5vw)] top-[min(5.5vh,5.5vw)]',
};

export type PlayerMoveProps = {
  gameType?: GameType;
  onMove: (type: ShortTurnsList | LongTurnsList) => void;
};

export const PlayerMove: React.FC<PlayerMoveProps> = ({
  gameType = GameType.SHORT,
  onMove,
}) => {
  const t = useTranslations('Game');

  const handleClick = (type: ShortTurnsList | LongTurnsList) => {
    onMove(type);
  };

  return (
    <div className="relative">
      <Image
        src={gameType === GameType.SHORT ? BgTriangle : BgPentagon}
        alt={gameType === GameType.SHORT ? t('triangle') : t('pentagon')}
        className="size-[min(31vh,31vw)]"
      />
      <RoundButton
        type={LongTurnsList.PAPER}
        size={
          gameType === GameType.SHORT ? ButtonSizes.MEDIUM : ButtonSizes.SMALL
        }
        styles={
          gameType === GameType.SHORT
            ? shortTypeStyles[ShortTurnsList.PAPER]
            : longTypeStyles[LongTurnsList.PAPER]
        }
        onClick={() => handleClick(LongTurnsList.PAPER)}
      />
      <RoundButton
        type={LongTurnsList.SCISSORS}
        size={
          gameType === GameType.SHORT ? ButtonSizes.MEDIUM : ButtonSizes.SMALL
        }
        styles={
          gameType === GameType.SHORT
            ? shortTypeStyles[ShortTurnsList.SCISSORS]
            : longTypeStyles[LongTurnsList.SCISSORS]
        }
        onClick={() => handleClick(LongTurnsList.SCISSORS)}
      />
      <RoundButton
        type={LongTurnsList.ROCK}
        size={
          gameType === GameType.SHORT ? ButtonSizes.MEDIUM : ButtonSizes.SMALL
        }
        styles={
          gameType === GameType.SHORT
            ? shortTypeStyles[ShortTurnsList.ROCK]
            : longTypeStyles[LongTurnsList.ROCK]
        }
        onClick={() => handleClick(LongTurnsList.ROCK)}
      />
      {gameType === GameType.LONG && (
        <RoundButton
          type={LongTurnsList.LIZARD}
          size={ButtonSizes.SMALL}
          styles={longTypeStyles[LongTurnsList.LIZARD]}
          onClick={() => handleClick(LongTurnsList.LIZARD)}
        />
      )}
      {gameType === GameType.LONG && (
        <RoundButton
          type={LongTurnsList.SPOCK}
          size={ButtonSizes.SMALL}
          styles={longTypeStyles[LongTurnsList.SPOCK]}
          onClick={() => handleClick(LongTurnsList.SPOCK)}
        />
      )}
    </div>
  );
};
