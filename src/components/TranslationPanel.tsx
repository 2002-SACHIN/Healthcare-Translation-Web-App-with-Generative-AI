import React from 'react';
import { Mic, Volume2, Languages, Trash2 } from 'lucide-react';

interface TranslationPanelProps {
  isSource?: boolean;
  language: string;
  text: string;
  interimText?: string;
  isListening?: boolean;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onSpeak?: () => void;
  onClear: () => void;
  onLanguageChange: (language: string) => void;
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({
  isSource = false,
  language,
  text,
  interimText = '',
  isListening = false,
  onStartListening,
  onStopListening,
  onSpeak,
  onClear,
  onLanguageChange,
}) => {
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
  ];

  return (
    <div className="w-full md:w-1/2 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-indigo-600" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            {isSource && (
              <button
                onClick={isListening ? onStopListening : onStartListening}
                className={`p-2 rounded-full ${
                  isListening
                    ? 'bg-red-100 text-red-600'
                    : 'bg-indigo-100 text-indigo-600'
                } hover:opacity-80 transition-opacity`}
                title={isListening ? 'Stop recording' : 'Start recording'}
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
            {!isSource && (
              <button
                onClick={onSpeak}
                className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:opacity-80 transition-opacity"
                title="Play translation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClear}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:opacity-80 transition-opacity"
              title="Clear text"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-4 h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">
            {text}
            {interimText && (
              <span className="text-gray-400 italic">{interimText}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;