import parsePseudoElement from '../parsePseudoElement'
import getSelectorContext from '../getSelectorContext'

export default subject => {
  const { id, tagName } = subject
  const pseudo = parsePseudoElement(subject)
  const context = getSelectorContext(subject)
  const tag = tagName && tagName !== '*' ? `<${tagName}>` : ''
  const article =
    id || ['html', 'body', 'head'].includes(tagName)
      ? 'the'
      : context || tag
      ? 'a'
      : 'an'

  return pseudo + [article, context, tag, 'element'].filter(Boolean).join(' ')
}
