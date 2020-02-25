const LINKS = {
  nth: 'https://css-tricks.com/examples/nth-child-tester/',
}

const capitalise = value => value.slice(0, 1).toUpperCase() + value.slice(1)

const asSentence = value => capitalise(value) + '.'

export const linkify = format => (label, href) => {
  if (format === 'html') {
    return `<a href="${href}" rel="noopener noreferrer" target="_blank">${label}</a>`
  }

  if (format === 'markdown') {
    return `[${label}](${href})`
  }

  return label
}

export const addLineBreaks = format => value => {
  const cr = format === 'html' ? '<br>' : format === 'markdown' ? '  \n' : '\n'

  return value
    .replace(/([^yf]) within/g, (...args) => `${args[1]}${cr}… within`)
    .replace(/([^y]) after/g, (...args) => `${args[1]}${cr}… after`)
    .replace(/([^f]) directly/g, (...args) => `${args[1]}${cr}… directly`)
    .replace(/element of/g, `element${cr}… of`)
    .replace(/itself/g, `${cr}… itself`)
}

const toHTML = (value, options) => {
  let result = asSentence(value)
    // Make sure tag names are properly displayed and not rendered as HTML
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Wrap emphases with <code> elements for clarity
    .replace(/‘([^’]+)’/g, (...args) => `<code>${args[1]}</code>`)

  // Insert line breaks for readability
  if (options.lineBreaks) {
    result = addLineBreaks(options.format)(result)
  }

  // Add useful links
  if (options.links) {
    const link = linkify(options.format)

    result = result
      .replace(/nth child/g, link('nth child', LINKS.nth))
      .replace(/nth of its type/g, link('nth of its type', LINKS.nth))
  }

  return result
}

const toMarkdown = (value, options) => {
  let result = asSentence(value).replace(/[‘’]/g, '`')

  // Insert line breaks for readability
  if (options.lineBreaks) {
    result = addLineBreaks(options.format)(result)
  }

  // Add useful links
  if (options.links) {
    const link = linkify(options.format)

    result = result
      .replace(/nth child/g, link('nth child', LINKS.nth))
      .replace(/nth of its type/g, link('nth of its type', LINKS.nth))
  }

  return result
}

export default (options = {}) => selector => {
  switch (options.format) {
    case 'html':
      return toHTML(selector, options)
    case 'markdown':
      return toMarkdown(selector, options)
    case 'raw':
    default:
      return asSentence(selector)
  }
}
