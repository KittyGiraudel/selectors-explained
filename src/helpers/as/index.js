import parsePseudoElement from '../parsePseudoElement'
import parsePseudoClasses from '../parsePseudoClasses'

export default subject => {
  const { id, tagName } = subject
  const pseudo = parsePseudoElement(subject)
  const context = parsePseudoClasses(subject)
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
