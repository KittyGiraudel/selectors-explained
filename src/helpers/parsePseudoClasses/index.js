import enumerate from '../enumerate'
import { PSEUDO_CLASSES } from '../../constants'

const isPseudoClass = ({ name }) => PSEUDO_CLASSES.includes(name)

const explainPseudoClass = ({ name }) => {
  switch (name) {
    case 'hover':
      return 'hovered'
    case 'active':
      return 'active'
    case 'focus':
      return 'focused'
    case 'checked':
      return 'checked'
  }
}

export default ({ pseudos = [] }) =>
  enumerate(pseudos.filter(isPseudoClass).map(explainPseudoClass))
