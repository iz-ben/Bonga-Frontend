export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const API_BASE =
  process.env.NODE_ENV !== 'production'
    ? 'http://192.168.99.100:8000/api/v1'
    : 'https://api.bonga.or.ke/v1';

export const LOCALHOST_KEY = '6LdL2G4UAAAAAKwn2ce0zQ_PrO7ffu9kBwV9Rccu';
export const SERVER_KEY = '6Ldv6UoUAAAAAPA5yh6gyuCgIIrDNIYbItP4M7Pn';
export const RECAPTCHA_KEY = process.env.NODE_ENV !== 'production' ? LOCALHOST_KEY : SERVER_KEY;

export const SLOGANS = [
  'Bonga',
  'Ongea',
  'Funguka',
  'Sema Kitu',
  'Share',
  'Unwind',
  'Vent'
];
