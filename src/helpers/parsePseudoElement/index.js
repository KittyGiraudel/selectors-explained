import highlight from '../highlight'
import isPseudoClass from '../isPseudoClass'

export default ({ pseudos = [] }) => {
  const pseudoElement = pseudos.find(
    pseudo => pseudo.name !== '' && !isPseudoClass(pseudo)
  )

  if (pseudoElement) {
    return `the ${highlight(pseudoElement.name)} pseudo-element of `
  }

  return ''
}
