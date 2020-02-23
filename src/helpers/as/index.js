import parsePseudoElement from '../parsePseudoElement'

export default subject => {
  const { id, tagName } = subject
  const pseudo = parsePseudoElement(subject)
  const tag = tagName && tagName !== '*' ? `<${tagName}>` : ''
  const content = [tag, 'element'].filter(Boolean).join(' ')
  const article =
    id || ['html', 'body', 'head'].includes(tagName)
      ? 'the'
      : /^[aeiouy]/.test(content)
      ? 'an'
      : 'a'

  return pseudo + article + ' ' + content
}
