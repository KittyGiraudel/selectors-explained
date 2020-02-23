import pluralise from '../pluralise'
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
  }
}

export default ({ attrs = [] }) =>
  enumerate(
    attrs.map(
      ({ name, value, operator }) =>
        'an attribute ' +
        (value
          ? `${withQuotes(name)} whose value ${explainAttrOperator(
              operator
            )} ${withQuotes(value)}`
          : withQuotes(name))
    )
  )
