
import buildUrl from 'build-url';

export const buildApiUrl = (base, options={})=>buildUrl(base, {queryParams:options})
