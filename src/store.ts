import { create } from 'zustand';
import { FlashCard, UserStats } from './types';

interface Store {
  flashcards: FlashCard[];
  userStats: UserStats;
  addFlashcard: (card: FlashCard) => void;
  removeFlashcard: (id: string) => void;
  updateStreak: () => void;
}

export const useStore = create<Store>((set) => ({
  flashcards: [],
  userStats: {
    streak: 0,
    lastLogin: new Date(),
    cardsLearned: 0,
  },
  addFlashcard: (card) =>
    set((state) => ({
      flashcards: [...state.flashcards, card],
      userStats: {
        ...state.userStats,
        cardsLearned: state.userStats.cardsLearned + 1,
      },
    })),
  removeFlashcard: (id) =>
    set((state) => ({
      flashcards: state.flashcards.filter((card) => card.id !== id),
    })),
  updateStreak: () =>
    set((state) => {
      const today = new Date();
      const lastLogin = new Date(state.userStats.lastLogin);
      const isConsecutiveDay =
        today.getDate() - lastLogin.getDate() === 1 ||
        (today.getDate() - lastLogin.getDate() === 0 &&
          today.getTime() !== lastLogin.getTime());

      return {
        userStats: {
          ...state.userStats,
          streak: isConsecutiveDay ? state.userStats.streak + 1 : 1,
          lastLogin: today,
        },
      };
    }),
}));