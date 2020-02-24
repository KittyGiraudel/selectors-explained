import highlight from '../highlight'
import isPseudoClass from '../isPseudoClass'

/**
 * Explain the pseudo-element in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export default ({ pseudos = [] }) => {
  const pseudoElement = pseudos.find(
    pseudo => pseudo.name !== '' && !isPseudoClass(pseudo)
  )

  if (pseudoElement) {
    return `the ${highlight(pseudoElement.name)} pseudo-element of `
  }

  return ''
}
