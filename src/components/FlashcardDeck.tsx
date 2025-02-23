import React from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store';
import { FlashCard } from '../types';

export const FlashcardDeck: React.FC = () => {
  const { flashcards, removeFlashcard } = useStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Flashcard Deck</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {flashcards.map((card: FlashCard) => (
          <div
            key={card.id}
            className="bg-white p-4 rounded-lg shadow-md relative group"
          >
            <button
              onClick={() => removeFlashcard(card.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
            <div className="text-3xl mb-2">{card.character}</div>
            <div className="text-sm text-gray-600">{card.pinyin}</div>
            <div className="text-sm">{card.meaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
};