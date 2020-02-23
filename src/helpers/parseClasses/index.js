import enumerate from '../enumerate'
import withQuotes from '../withQuotes'

export default ({ classNames = [] }) => {
  if (classNames.length === 0) {
    return ''
  }

  if (classNames.length === 1) {
    return 'class ' + withQuotes(classNames[0])
  }

  return 'classes ' + enumerate(classNames.map(withQuotes))
}
