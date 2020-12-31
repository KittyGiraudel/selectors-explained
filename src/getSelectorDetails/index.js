import { parseAttributes, parseClasses, parseId } from '../parse'
import { asSentence } from '../utils'

/**
 * Get a selector details, that is how it can be described (ID, classes,
 * attributes…) which omitting pseudo-classes.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
export default component =>
  [parseId(component), parseClasses(component), parseAttributes(component)]
    .filter(Boolean)
    .reduce(asSentence, '')
