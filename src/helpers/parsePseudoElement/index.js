import { PSEUDO_CLASSES } from '../../constants'
import withQuotes from '../withQuotes'

const getPseudoElement = ({ pseudos = [] }) =>
  pseudos
    .map(pseudo => pseudo.name)
    .find(pseudo => pseudo && !PSEUDO_CLASSES.includes(pseudo))

export default subject => {
  const pseudoElement = getPseudoElement(subject)

  if (pseudoElement) {
    return `the ${withQuotes(pseudoElement)} pseudo-element of `
  }

  return ''
}
