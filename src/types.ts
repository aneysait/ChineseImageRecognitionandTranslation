export interface FlashCard {
  id: string;
  character: string;
  pinyin: string;
  meaning: string;
  dateAdded: Date;
}

export interface UserStats {
  streak: number;
  lastLogin: Date;
  cardsLearned: number;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  characters: Array<{
    character: string;
    pinyin: string;
    meaning: string;
  }>;
}