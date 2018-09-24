/**
 * Removes duplicate items from array
 * @param myArr
 * @param prop
 * @returns {*}
 */
export const removeDuplicates = (myArr, prop) =>
  myArr.filter(
    (obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos,
  );
