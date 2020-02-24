import { parseAttributes, parseClasses, parseId } from '../parse'
import { asSentence } from '../utils'

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
    .reduce(asSentence, '')
