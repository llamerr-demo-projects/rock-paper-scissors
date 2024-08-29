import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { Game } from '@/components/Game/Game';
import { GameType } from '@/libs/RPS.types';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Game',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function GamePage() {
  const cookieStore = cookies();
  const score = Number.parseInt(cookieStore.get('score')?.value || '0', 10);
  const gameType
    = (cookieStore.get('gameType')?.value as GameType) || GameType.SHORT;
  return (
    <main className="h-screen bg-radial">
      <Game score={score} gameType={gameType} />
    </main>
  );
}
