import explainSelector from '../explainSelector'

const explainContext = ({ nestingOperator }) => {
  switch (nestingOperator) {
    case '>':
      return ' directly within '
    case '+':
      return ' directly after '
    case '~':
      return ' after '
    default:
      return ' within '
  }
}

export default selectors =>
  selectors.reduce((acc, selector, index) => {
    const outcome = acc + explainSelector(selector)
    const isFirst = index === 0
    const context = explainContext(selector)

    if (index === selectors.length - 1) {
      return outcome
    }
    return outcome + (isFirst ? '' : ' itself') + context
  }, '')
