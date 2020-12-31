import format from '../format'
import getComponents from '../getComponents'
import getSelectorSubject from '../getSelectorSubject'
import getSelectorDetails from '../getSelectorDetails'
import { parsePseudoClasses } from '../parse'
import * as CSSwhat from 'css-what'

const explainRelationship = ({ relationship }) => {
  switch (relationship) {
    case 'child':
      return ' directly within '
    case 'adjacent':
      return ' directly adjacent to '
    case 'sibling':
      return ' after '
    case 'descendant':
    default:
      return ' somewhere within '
  }
}

/**
 * Explain a selector in plain English, subject, details and context.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
const explainComponent = component =>
  [
    getSelectorSubject(component),
    getSelectorDetails(component),
    parsePseudoClasses(component),
  ]
    .filter(Boolean)
    .join(' ')

/**
 * Make a sentence out of a CSS selector by explaining each component and
 * joining them with the appropriate connector depending on their nesting
 * operator.
 * @param {Object[]} components - Processed components from the AST
 * @returns {String}
 */
const explainSelector = components =>
  components.reduce((acc, component, index, array) => {
    const outcome = acc + explainComponent(component)
    const isLast = index === array.length - 1
    const isFirst = index === 0

    return isLast
      ? outcome
      : outcome + (isFirst ? '' : ' itself') + explainRelationship(component)
  }, '')

/**
 * Explain a DOM selector into plain English.
 * @param {String} selector - DOM selector (possibly with commas)
 * @param {String} options.format - Which format to use (html, markdown or raw)
 * @param {Boolean} options.links - Whether to insert useful links
 * @param {Boolean} options.lineBreaks - Whether to insert line breaks
 * @returns {String}
 */
export default (selector, options) =>
  CSSwhat.parse(selector)
    .map(getComponents)
    .map(explainSelector)
    .map(format(options))
