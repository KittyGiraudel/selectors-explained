import explainSelector from '../explainSelector'
import format from '../format'

/**
 * Explain a DOM selector into plain English.
 * @param {String} selector - DOM selector (possibly with commas)
 * @param {String} options.format - Which format to use (html, markdown or raw)
 * @param {Boolean} options.links - Whether to insert useful links
 * @param {Boolean} options.lineBreaks - Whether to insert line breaks
 * @paren {String}
 */
export default (selector, options) =>
  selector
    .split(/\s*,\s*/g)
    .map(explainSelector)
    .map(format(options))
