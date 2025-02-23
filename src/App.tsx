import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { ImageUploader } from './components/ImageUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { FlashcardDeck } from './components/FlashcardDeck';
import { UserProgress } from './components/UserProgress';
import { CharacterBreakdown } from './components/CharacterBreakdown';
import { translateText, getCharacterDetails } from './services/translation';
import { useStore } from './store';
import { Book } from 'lucide-react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [recognizedText, setRecognizedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [characters, setCharacters] = useState<Array<{
    character: string;
    pinyin: string;
    meaning: string;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateStreak } = useStore();

  useEffect(() => {
    updateStreak();
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      // Step 1: Recognize Chinese text from image
      const worker = await createWorker('chi_sim');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      if (!text.trim()) {
        throw new Error('No Chinese text detected in the image');
      }

      setRecognizedText(text);

      // Step 2: Get character details
      const charDetails = await getCharacterDetails(text);
      setCharacters(charDetails);

      // Step 3: Translate the full text
      const translation = await translateText(text, selectedLanguage);
      setTranslatedText(translation);
    } catch (error) {
      console.error('Error processing image:', error);
      setError(error instanceof Error ? error.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Chinese Text Image Translator
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              By Anicet Barrios & Florian Thuau
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Translate to:
                </label>
                <LanguageSelector
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                />
              </div>
            </div>

            <UserProgress />
          </div>

          <div className="space-y-6">
            {isProcessing ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2">Processing image...</span>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-red-500">{error}</div>
              </div>
            ) : (
              recognizedText && (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Results</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          Original Text:
                        </h3>
                        <p className="mt-1 text-lg">{recognizedText}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          Translation:
                        </h3>
                        <p className="mt-1 text-lg">{translatedText}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <CharacterBreakdown characters={characters} />
                  </div>
                </>
              )
            )}

            <FlashcardDeck />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;