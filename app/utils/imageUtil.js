/**
 * @type {string}
 */
export const IMAGE_PATTERN = '__w-((?:-?\\d+)+)__';

/**
 * @param url
 * @returns {array}
 */
export const getSizes = url => {
  const match = url.match(IMAGE_PATTERN);
  return match && match.length ? match[1].split('-') : [];
};

/**
 *
 * @param url
 * @param width
 * @returns {string}
 */
export const getSrc = (url, width) => {
  const sizes = getSizes(url);
  const image = sizes.find(size => size >= width);
  if (!image) return url;
  return url.replace(new RegExp(IMAGE_PATTERN), `w${image}`);
};
