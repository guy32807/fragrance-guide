interface Window {
  gtag: (
    command: 'event' | 'config' | 'consent' | 'set',
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
}