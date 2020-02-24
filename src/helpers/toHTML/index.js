const capitalise = value => value.slice(0, 1).toUpperCase() + value.slice(1)

const asSentence = value => capitalise(value) + '.'

const linkify = (label, href) =>
  `<a href="${href}" rel="noopener noreferrer" target="_blank">${label}</a>`

const toHTML = value =>
  asSentence(value)
    // Make sure tag names are properly displayed and not rendered as HTML
    .replace(/</g, '‘&lt;')
    .replace(/>/g, '&gt;’')
    // Wrap emphases with <code> elements for clarity
    .replace(/‘/g, '<code>')
    .replace(/’/g, '</code>')
    // Insert line breaks for readability
    .replace(/([^yf]) within/g, (...args) => `${args[1]}<br>… within`)
    .replace(/([^y]) after/g, (...args) => `${args[1]}<br>… after`)
    .replace(/([^f]) directly/g, (...args) => `${args[1]}<br>… directly`)
    .replace(/element of/g, 'element<br>… of')
    .replace(/itself/g, '<br>… itself')

    // Add useful links
    .replace(
      /nth child/g,
      linkify('nth child', 'https://css-tricks.com/examples/nth-child-tester/')
    )
    .replace(
      /nth of its type/g,
      linkify(
        'nth of its type',
        'https://css-tricks.com/examples/nth-child-tester/'
      )
    )

export default toHTML
