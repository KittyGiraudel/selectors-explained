export { default as specify } from 'specimen'
import explainSelector from './helpers/explainSelector'
import toHTML from './helpers/toHTML'

/**
 * Explain a DOM selector into plain English.
 * @param {String} selector - DOM selector (possibly with commas)
 * @param {Boolean} options.html - Whether to return formatted HTML
 * @paren {String}
 */
export const explain = (selector, options = {}) => {
  const data = selector.split(/\s*,\s*/g).map(explainSelector)

  return options.html ? data.map(toHTML) : data
}
