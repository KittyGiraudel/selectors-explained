import { PSEUDO_CLASSES, PSEUDO_ELEMENTS } from '../constants'
import { enumerate, highlight } from '../utils'

const isPseudoClass = ({ name }) => Object.keys(PSEUDO_CLASSES).includes(name)

/**
 * Explain the pseudo-element in plain English.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
export const parsePseudoElement = ({ pseudoElements = [] }) => {
  if (pseudoElements.length) {
    const { name } = pseudoElements[0]
    const pseudoElement =
      PSEUDO_ELEMENTS[name] || `${highlight(name)} pseudo-element`

    return `the ${pseudoElement} of `
  }

  return ''
}

/**
 * Explain the classe(s) in plain English.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
export const parseClasses = ({ classes = [] }) => {
  if (classes.length === 0) {
    return ''
  }

  if (classes.length === 1) {
    return 'class ' + highlight(classes[0])
  }

  return 'classes ' + enumerate(classes.map(highlight))
}

/**
 * Explain the ID in plain English.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
export const parseId = ({ id }) => (id ? `id ${highlight(id)}` : '')

/**
 * Explain the pseudo-classes in plain English.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
export const parsePseudoClasses = ({ pseudoClasses = [] }) => {
  const states = pseudoClasses
    .filter(isPseudoClass)
    .map(pseudo => PSEUDO_CLASSES[pseudo.name])

  return pseudoClasses.length > 0 ? `provided it is ${enumerate(states)}` : ''
}

const explainAttrOperator = attr => {
  if (attr.value === '') {
    return attr.action === 'equals' ? 'whose value is empty' : ''
  }

  const casing = attr.ignoreCase ? ' (regardless of casing)' : ''
  const value = highlight(attr.value) + casing

  switch (attr.action) {
    case 'equals':
      return 'whose value is ' + value
    case 'any':
      return 'whose value contains ' + value
    case 'start':
      return 'whose value starts with ' + value
    case 'end':
      return 'whose value ends with ' + value
    case 'element':
      return (
        'whose value is a space-separated list of values, one of which is ' +
        value
      )
    case 'hyphen':
      return (
        'whose value is an hyphen-separated list of values, one of which is ' +
        value
      )
  }
}

/**
 * Explain the attribute selector(s) in plain English.
 * @param {Object} component - A processed component from the AST
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
