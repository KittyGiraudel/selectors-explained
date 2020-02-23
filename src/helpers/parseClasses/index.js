import pluralise from '../pluralise'
import enumerate from '../enumerate'
import withQuotes from '../withQuotes'

export default ({ classNames = [] }) =>
  classNames.length > 0
    ? pluralise('class')(classNames) +
      ' ' +
      enumerate(classNames.map(withQuotes))
    : ''
