import withQuotes from '../withQuotes'
import isPseudoClass from '../isPseudoClass'

export default ({ pseudos = [] }) => {
  const pseudoElement = pseudos.find(
    pseudo => pseudo.name !== '' && !isPseudoClass(pseudo)
  )

  if (pseudoElement) {
    return `the ${withQuotes(pseudoElement.name)} pseudo-element of `
  }

  return ''
}
