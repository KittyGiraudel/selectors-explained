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

    if (index === selectors.length - 1) {
      return outcome
    }

    return outcome + (index === 0 ? '' : ' itself') + explainContext(selector)
  }, '')
