import enumerate from '../enumerate'
import highlight from '../highlight'

export default ({ classNames = [] }) => {
  if (classNames.length === 0) {
    return ''
  }

  if (classNames.length === 1) {
    return 'class ' + highlight(classNames[0])
  }

  return 'classes ' + enumerate(classNames.map(highlight))
}
