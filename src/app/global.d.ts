export {};

declare global {
  interface Window {
    fbq: ((event: string, ...args: any[]) => void) & {
      callMethod?: (...args: any[]) => void;
      queue?: any[];
      loaded?: boolean;
      version?: string;
      push?: (...args: any[]) => void;
    };
    _fbq?: typeof window.fbq;
  }
}
