import { useCallback } from 'react';

interface UseSpeechSynthesisProps {
  language: string;
}

export const useSpeechSynthesis = ({ language }: UseSpeechSynthesisProps) => {
  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  }, [language]);

  return { speak };
};

export default useSpeechSynthesis;