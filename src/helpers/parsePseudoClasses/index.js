import { PSEUDO_CLASSES } from '../../constants'
import enumerate from '../enumerate'
import isPseudoClass from '../isPseudoClass'

/**
 * Explain the pseudo-classes in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export default ({ pseudos = [] }) => {
  const pseudoClasses = pseudos
    .filter(isPseudoClass)
    .map(pseudo => PSEUDO_CLASSES[pseudo.name])

  return pseudoClasses.length > 0
    ? `provided it is ${enumerate(pseudoClasses)}`
    : ''
}
