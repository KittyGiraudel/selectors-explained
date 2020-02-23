import { PSEUDO_CLASSES } from '../../constants'
import enumerate from '../enumerate'
import isPseudoClass from '../isPseudoClass'

export default ({ pseudos = [] }) => {
  const pseudoClasses = pseudos
    .filter(isPseudoClass)
    .map(pseudo => PSEUDO_CLASSES[pseudo.name])

  return pseudoClasses.length > 0
    ? `provided it is ${enumerate(pseudoClasses)}`
    : ''
}
