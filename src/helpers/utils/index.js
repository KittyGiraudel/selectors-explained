/**
 * Enumerate a list of items by splitting with commas up to the last one, which
 * is announced with ‘and’.
 * @param {String[]} items - Items to enumerate
 * @returns {String}
 */
export const enumerate = items => {
  return items.reduce((acc, item, index) => {
    if (index === 0) return acc + item
    if (index === items.length - 1) return acc + ' and ' + item
    else return acc + ', ' + item
  }, '')
}

export const highlight = item => `\`${item}\``

export const asSentence = (acc, item, index) => {
  if (index === 0) return acc + 'with ' + item
  else return acc + ' and ' + item
}
