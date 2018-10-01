import buildUrl from 'build-url';

/**
 * Generate relevant api url
 * @param base
 * @param options
 * @returns {*}
 */
export const buildApiUrl = (base, options = {}) =>
  buildUrl(base, { queryParams: options });
