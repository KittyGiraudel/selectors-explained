import enumerate from '../enumerate'
import highlight from '../highlight'

/**
 * Explain the classe(s) in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export default ({ classNames = [] }) => {
  if (classNames.length === 0) {
    return ''
  }

  if (classNames.length === 1) {
    return 'class ' + highlight(classNames[0])
  }

  return 'classes ' + enumerate(classNames.map(highlight))
}
