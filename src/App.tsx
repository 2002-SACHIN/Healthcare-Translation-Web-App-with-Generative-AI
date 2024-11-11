import React, { useState, useCallback } from 'react';
import { Stethoscope } from 'lucide-react';
import TranslationPanel from './components/TranslationPanel';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import useSpeechSynthesis from './hooks/useSpeechSynthesis';
import { translateText } from './services/translationService';

export default function App() {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranscript = useCallback(async (text: string) => {
    setSourceText((prev) => {
      const newText = prev + ' ' + text;
      return newText.trim();
    });
    
    const translated = await translateText(text, targetLanguage);
    setTranslatedText((prev) => {
      const newText = prev + ' ' + translated;
      return newText.trim();
    });
  }, [targetLanguage]);

  const handleInterimTranscript = useCallback((text: string) => {
    setInterimText(text);
  }, []);

  const { isListening, startListening, stopListening } = useSpeechRecognition({
    language: sourceLanguage,
    onTranscript: handleTranscript,
    onInterimTranscript: handleInterimTranscript
  });

  const { speak: speakTranslated } = useSpeechSynthesis({
    language: targetLanguage,
  });

  const handleSpeak = () => {
    if (translatedText) {
      speakTranslated(translatedText);
    }
  };

  const handleClear = () => {
    setSourceText('');
    setInterimText('');
    setTranslatedText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Healthcare Translation
          </h1>
          <p className="text-gray-600">
            Real-time medical translation for better patient care
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          <TranslationPanel
            isSource
            language={sourceLanguage}
            text={sourceText}
            interimText={interimText}
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            onClear={handleClear}
            onLanguageChange={setSourceLanguage}
          />
          <TranslationPanel
            language={targetLanguage}
            text={translatedText}
            onSpeak={handleSpeak}
            onClear={handleClear}
            onLanguageChange={setTargetLanguage}
          />
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2024 Healthcare Translation. All rights reserved.</p>
          <p className="mt-2">
            Powered by advanced AI for accurate medical translations
          </p>
        </footer>
      </div>
    </div>
  );
}