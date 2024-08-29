'use server';

import { cookies } from 'next/headers';

import type { GameType } from '@/libs/RPS.types';

export async function setScore(score: number) {
  cookies().set('score', score.toString());
}

export async function setGameType(gameType: GameType) {
  cookies().set('gameType', gameType);
}
