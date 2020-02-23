import { PSEUDO_CLASSES } from '../../constants'
import enumerate from '../enumerate'
import isPseudoClass from '../isPseudoClass'

export default ({ pseudos = [] }) =>
  enumerate(
    pseudos.filter(isPseudoClass).map(pseudo => PSEUDO_CLASSES[pseudo.name])
  )
