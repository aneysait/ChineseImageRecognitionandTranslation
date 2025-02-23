import React from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../store';

interface Props {
  characters: Array<{
    character: string;
    pinyin: string;
    meaning: string;
  }>;
}

export const CharacterBreakdown: React.FC<Props> = ({ characters }) => {
  const { addFlashcard } = useStore();

  const handleAddToFlashcards = (char: {
    character: string;
    pinyin: string;
    meaning: string;
  }) => {
    addFlashcard({
      id: Math.random().toString(36).substr(2, 9),
      character: char.character,
      pinyin: char.pinyin,
      meaning: char.meaning,
      dateAdded: new Date(),
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Character Breakdown</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((char, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative group"
          >
            <button
              onClick={() => handleAddToFlashcards(char)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 text-white p-1 rounded-full"
              title="Add to flashcards"
            >
              <Plus className="h-4 w-4" />
            </button>
            <div className="text-3xl mb-2">{char.character}</div>
            <div className="text-sm font-medium text-blue-600">{char.pinyin}</div>
            <div className="text-sm text-gray-600">{char.meaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
};