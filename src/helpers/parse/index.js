import { PSEUDO_CLASSES } from '../../constants'
import enumerate from '../enumerate'
import highlight from '../highlight'
import isPseudoClass from '../isPseudoClass'

/**
 * Explain the pseudo-element in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export const parsePseudoElement = ({ pseudos = [] }) => {
  const pseudoElement = pseudos.find(
    pseudo => pseudo.name !== '' && !isPseudoClass(pseudo)
  )

  if (pseudoElement) {
    return `the ${highlight(pseudoElement.name)} pseudo-element of `
  }

  return ''
}

/**
 * Explain the classe(s) in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export const parseClasses = ({ classNames = [] }) => {
  if (classNames.length === 0) {
    return ''
  }

  if (classNames.length === 1) {
    return 'class ' + highlight(classNames[0])
  }

  return 'classes ' + enumerate(classNames.map(highlight))
}

/**
 * Explain the ID in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export const parseId = ({ id }) => (id ? `id ${highlight(id)}` : '')

/**
 * Explain the pseudo-classes in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export const parsePseudoClasses = ({ pseudos = [] }) => {
  const pseudoClasses = pseudos
    .filter(isPseudoClass)
    .map(pseudo => PSEUDO_CLASSES[pseudo.name])

  return pseudoClasses.length > 0
    ? `provided it is ${enumerate(pseudoClasses)}`
    : ''
}

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
export const parseAttributes = ({ attrs = [] }) =>
  enumerate(
    attrs.map(attr =>
      ['an attribute', highlight(attr.name), explainAttrOperator(attr)]
        .filter(Boolean)
        .join(' ')
    )
  )
