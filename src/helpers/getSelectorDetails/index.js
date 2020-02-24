import parseAttributes from '../parseAttributes'
import parseClasses from '../parseClasses'
import parseId from '../parseId'

const asASentence = (acc, item, index) => {
  if (index === 0) return acc + 'with ' + item
  else return acc + ' and ' + item
}

/**
 * Get a selector details, that is how it can be described (ID, classes,
 * attributes…) which omitting pseudo-classes.
 * @param {Object} - A selector node from the ASt
 * @returns {String}
 */
export default selector =>
  [parseId, parseClasses, parseAttributes]
    .map(fn => fn(selector))
    .filter(Boolean)
    .reduce(asASentence, '')
