import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { GameType } from '@/libs/RPS.types';

import { NarrowText } from '../NarrowText/NarrowText';
import CloseIcon from './images/icon-close.svg';
import RulesImageShort from './images/image-rules.svg';
import RulesImageLong from './images/image-rules-bonus.svg';

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  gameType: GameType;
};

export const RulesModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  gameType,
}) => {
  const t = useTranslations('Game');

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-30">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/90 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center">
          <DialogPanel
            transition
            className="data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:max-w-lg relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="bg-white p-8 mobile:h-screen mobile:w-screen">
              <div className="grid size-full gap-8 [grid-template-areas:'title_._button''image_image_image'] mobile:[grid-template-areas:'title''image''button']">
                <NarrowText className="self-center justify-self-center text-3xl font-bold uppercase text-blue-900 [grid-area:title]">
                  {t('rules')}
                </NarrowText>
                <button
                  className="justify-self-center [grid-area:button]"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  <Image src={CloseIcon} alt={t('rules')} />
                </button>
                <Image
                  className="[grid-area:image] mobile:w-full"
                  src={
                    gameType === GameType.SHORT
                      ? RulesImageShort
                      : RulesImageLong
                  }
                  alt={t('rules')}
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
