import enumerate from '../enumerate'
import withQuotes from '../withQuotes'

const explainAttrOperator = operator => {
  switch (operator) {
    case '=':
      return 'is'
    case '*=':
      return 'contains'
    case '^=':
      return 'starts with'
    case '$=':
      return 'ends with'
    case '~=':
      return 'contains, surrounded with spaces,'
  }
}

const explainAttr = ({ name, value, operator }) =>
  'an attribute ' +
  (value
    ? `${withQuotes(name)} whose value ${explainAttrOperator(
        operator
      )} ${withQuotes(value)}`
    : withQuotes(name))

export default ({ attrs = [] }) => {
  if (attrs.length === 0) {
    return ''
  }

  return enumerate(attrs.map(explainAttr))
}
