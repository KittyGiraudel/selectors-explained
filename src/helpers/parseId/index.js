import highlight from '../highlight'

/**
 * Explain the ID in plain English.
 * @param {Object} selector - A selector node from the AST
 * @returns {String}
 */
export default ({ id }) => (id ? `id ${highlight(id)}` : '')
