import getComponents from '../getComponents'
import getSelectorSubject from '../getSelectorSubject'
import getSelectorDetails from '../getSelectorDetails'
import { parsePseudoClasses } from '../parse'

const explainRelationship = ({ nestingOperator }) => {
  switch (nestingOperator) {
    case '>':
      return ' directly within '
    case '+':
      return ' directly adjacent to '
    case '~':
      return ' after '
    default:
      return ' within '
  }
}

/**
 * Explain a selector in plain English, subject, details and context.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
const explainComponent = selector =>
  [getSelectorSubject, getSelectorDetails, parsePseudoClasses]
    .map(fn => fn(selector))
    .filter(Boolean)
    .join(' ')

/**
 * Make a sentence out of a CSS selector by explaining each component and
 * joining them with the appropriate connector depending on their nesting
 * operator.
 * @param {String} selector - Selector nodes from the AST
 * @returns {String}
 */
export default selector =>
  getComponents(selector).reduce((acc, component, index, array) => {
    const outcome = acc + explainComponent(component)

    return index === array.length - 1
      ? outcome
      : outcome +
          (index === 0 ? '' : ' itself') +
          explainRelationship(component)
  }, '')
