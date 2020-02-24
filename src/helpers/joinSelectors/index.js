import explainSelector from '../explainSelector'

const explainContext = ({ nestingOperator }) => {
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
 * Make a sentence out of selectors by joining them with the appropriate
 * connector depending on their nesting operator.
 * @param {Object[]} selectors - Selector nodes from the AST
 * @returns {String}
 */
export default selectors =>
  selectors.reduce((acc, selector, index) => {
    const outcome = acc + explainSelector(selector)

    if (index === selectors.length - 1) {
      return outcome
    }

    return outcome + (index === 0 ? '' : ' itself') + explainContext(selector)
  }, '')
