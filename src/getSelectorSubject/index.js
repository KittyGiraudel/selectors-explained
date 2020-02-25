import { UNIQUE_ELEMENTS } from '../constants'
import { parsePseudoElement } from '../parse'
import { highlight } from '../utils'

/**
 * Return the selector subject in plain English, taking pseudo-elements into
 * account.
 * @param {Object} subject - The subject node from the AST
 * @returns {String}
 */
export default subject => {
  const { id, tagName } = subject
  const tag = tagName && tagName !== '*' ? highlight(`<${tagName}>`) : ''
  const content = [tag, 'element'].filter(Boolean).join(' ')
  const article =
    id || UNIQUE_ELEMENTS.includes(tagName)
      ? 'the'
      : /^[aeiouy]/.test(content.replace('‘<', ''))
      ? 'an'
      : 'a'

  return parsePseudoElement(subject) + article + ' ' + content
}
