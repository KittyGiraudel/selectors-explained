import { UNIQUE_ELEMENTS } from '../../constants'
import parsePseudoElement from '../parsePseudoElement'

export default subject => {
  const { id, tagName } = subject
  const pseudo = parsePseudoElement(subject)
  const tag = tagName && tagName !== '*' ? `<${tagName}>` : ''
  const content = [tag, 'element'].filter(Boolean).join(' ')
  const article =
    id || UNIQUE_ELEMENTS.includes(tagName)
      ? 'the'
      : /^[aeiouy]/.test(content.replace('<', ''))
      ? 'an'
      : 'a'

  return pseudo + article + ' ' + content
}
