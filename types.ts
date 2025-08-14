export type Page = 'Home' | 'Your Designs' | 'Templates' | 'ReportMate AI';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface Design {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

// Define types for the browser's SpeechRecognition API to avoid TypeScript errors.
export interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

export interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}

// Augment the global Window interface
declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionStatic;
        webkitSpeechRecognition: SpeechRecognitionStatic;
    }
}
