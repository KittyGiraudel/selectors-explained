import parsePseudoElement from '../parsePseudoElement'
import getSelectorContext from '../getSelectorContext'

export default subject => {
  const { id, tagName } = subject
  const pseudo = parsePseudoElement(subject)
  const context = getSelectorContext(subject)
  const tag = tagName && tagName !== '*' ? `<${tagName}>` : ''
  const content = [context, tag, 'element'].filter(Boolean).join(' ')
  const article =
    id || ['html', 'body', 'head'].includes(tagName)
      ? 'the'
      : /^[aeiouy]/.test(content)
      ? 'an'
      : 'a'

  return pseudo + article + ' ' + content
}
