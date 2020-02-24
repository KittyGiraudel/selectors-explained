import enumerate from '../enumerate'
import highlight from '../highlight'

const explainAttrOperator = attr => {
  if (attr.value === '') {
    return attr.operator === '=' ? 'whose value is empty' : ''
  }

  const value = highlight(attr.value)

  switch (attr.operator) {
    case '=':
      return 'whose value is ' + value
    case '*=':
      return 'whose value contains ' + value
    case '^=':
      return 'whose value starts with ' + value
    case '$=':
      return 'whose value ends with ' + value
    case '~=':
      return (
        'whose value is a space-separated list of values, one of which is ' +
        value
      )
    case '|=':
      return (
        'whose value is an hyphen-separated list of values, one of which is ' +
        value
      )
  }
}

/**
 * Explain the attribute selector(s) in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export default ({ attrs = [] }) =>
  enumerate(
    attrs.map(attr =>
      ['an attribute', highlight(attr.name), explainAttrOperator(attr)]
        .filter(Boolean)
        .join(' ')
    )
  )
