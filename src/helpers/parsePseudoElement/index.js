import withQuotes from '../withQuotes'
import isPseudoClass from '../isPseudoClass'

const getPseudoElement = ({ pseudos = [] }) =>
  pseudos.find(pseudo => pseudo.name !== '' && !isPseudoClass(pseudo))

export default subject => {
  const pseudoElement = getPseudoElement(subject)

  if (pseudoElement) {
    return `the ${withQuotes(pseudoElement.name)} pseudo-element of `
  }

  return ''
}
