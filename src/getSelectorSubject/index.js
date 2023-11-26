import { UNIQUE_ELEMENTS } from '../constants'
import { parsePseudoElement } from '../parse'
import { highlight } from '../utils'

/**
 * Return the selector subject in plain English, taking pseudo-elements into
 * account.
 * @param {Object} component - A processed component from the AST
 * @returns {String}
 */
export default component => {
  const { id, tagName } = component
 
  const tag = tagName && tagName !== '*' ? highlight(`<${tagName}>`) : ''
  const content = [tag, 'element'].filter(Boolean).join(' ')
  const article =
    id || UNIQUE_ELEMENTS.includes(tagName)
      ? 'the'
      : /^[aeiouy]/.test(content.replace('‘<', ''))
      ? 'an'
      : 'a'
  if (tagName === '*') {
    return `any ${content}`;
  }
  return parsePseudoElement(component) + article + ' ' + content
}
