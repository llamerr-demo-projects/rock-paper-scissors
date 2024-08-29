import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type React from 'react';

import LizardImage from './icon-lizard.svg';
import PaperImage from './icon-paper.svg';
import RockImage from './icon-rock.svg';
import ScissorsImage from './icon-scissors.svg';
import SpockImage from './icon-spock.svg';
import { BorderSizes, ButtonSizes, ImageSizes, LongTurnsList, type ShortTurnsList } from './RoundButton.types';

const buttonColors: Record<LongTurnsList, string> = {
  [LongTurnsList.PAPER]: 'border-blue-500',
  [LongTurnsList.ROCK]: 'border-red-500',
  [LongTurnsList.SCISSORS]: 'border-yellow-500',
  [LongTurnsList.LIZARD]: 'border-purple-500',
  [LongTurnsList.SPOCK]: 'border-cyan-500',
};

const buttonImages: Record<LongTurnsList, string> = {
  [LongTurnsList.PAPER]: PaperImage,
  [LongTurnsList.ROCK]: RockImage,
  [LongTurnsList.SCISSORS]: ScissorsImage,
  [LongTurnsList.LIZARD]: LizardImage,
  [LongTurnsList.SPOCK]: SpockImage,
};

type SmallRoundButtonProps = {
  type: ShortTurnsList | LongTurnsList;
  styles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const SmallRoundButton: React.FC<SmallRoundButtonProps> = ({
  type,
  styles,
  onClick,
}) => {
  const t = useTranslations('Game');
  const label = t(type);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex items-center justify-center rounded-full bg-white`,
        buttonColors[type],
        ButtonSizes.SMALL,
        BorderSizes.SMALL,
        styles,
      )}
    >
      <Image
        src={buttonImages[type]}
        alt={label}
        className={ImageSizes.SMALL}
      />
    </button>
  );
};

type MediumRoundButtonProps = {
  type: ShortTurnsList | LongTurnsList;
  styles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const MediumRoundButton: React.FC<MediumRoundButtonProps> = ({
  type,
  styles,
  onClick,
}) => {
  const t = useTranslations('Game');
  const label = t(type);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex items-center justify-center rounded-full bg-white`,
        buttonColors[type],
        ButtonSizes.MEDIUM,
        BorderSizes.MEDIUM,
        styles,
      )}
    >
      <Image
        src={buttonImages[type]}
        alt={label}
        className={ImageSizes.MEDIUM}
      />
    </button>
  );
};

type LargeRoundButtonProps = {
  type: ShortTurnsList | LongTurnsList;
  styles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const LargeRoundButton: React.FC<LargeRoundButtonProps> = ({
  type,
  styles,
  onClick,
}) => {
  const t = useTranslations('Game');
  const label = t(type);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex items-center justify-center rounded-full bg-white`,
        buttonColors[type],
        ButtonSizes.LARGE,
        BorderSizes.LARGE,
        styles,
      )}
    >
      <Image
        src={buttonImages[type]}
        alt={label}
        className={ImageSizes.LARGE}
      />
    </button>
  );
};

type EmptyRoundButtonProps = {
  styles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const EmptyRoundButton: React.FC<EmptyRoundButtonProps> = ({
  styles,
  onClick,
}) => {
  const t = useTranslations('Game');

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `flex items-center justify-center rounded-full shadow-[0px_0px_1em_1px_rgba(255,255,255,0.1)] size-[min(25.5vh,25.5vw)] bg-button-blue`,
        styles,
      )}
      aria-label={t('computer_move')}
    />
  );
};

export type RoundButtonProps = {
  type?: ShortTurnsList | LongTurnsList;
  size?: ButtonSizes;
  styles?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// TODO: add storybook
// TODO: add tests? visual tests?
export const RoundButton: React.FC<RoundButtonProps> = ({
  type,
  size = ButtonSizes.SMALL,
  styles,
  onClick,
}) => {
  if (type) {
    if (size === ButtonSizes.SMALL) {
      return <SmallRoundButton type={type} styles={styles} onClick={onClick} />;
    }
    if (size === ButtonSizes.MEDIUM) {
      return (
        <MediumRoundButton type={type} styles={styles} onClick={onClick} />
      );
    }
    if (size === ButtonSizes.LARGE) {
      return <LargeRoundButton type={type} styles={styles} onClick={onClick} />;
    }
  }
  return <EmptyRoundButton styles={styles} onClick={onClick} />;
};
