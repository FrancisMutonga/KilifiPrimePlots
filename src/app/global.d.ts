export {};

declare global {
  interface Window {
    fbq: ((event: string, ...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: typeof window.fbq;
  }
}
