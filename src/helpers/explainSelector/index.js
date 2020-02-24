import getSelectorSubject from '../getSelectorSubject'
import getSelectorDetails from '../getSelectorDetails'
import parsePseudoClasses from '../parsePseudoClasses'

/**
 * Explain a selector in plain English, subject, details and context.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export default selector =>
  [getSelectorSubject, getSelectorDetails, parsePseudoClasses]
    .map(fn => fn(selector))
    .filter(Boolean)
    .join(' ')
