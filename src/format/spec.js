import format, { linkify, addLineBreaks } from './'

describe('The `format` helper', () => {
  it('should handle markdown format', () => {
    expect(format({ format: 'markdown' })('an ‘<a>’ element')).toBe(
      'An `&lt;a&gt;` element.'
    )
  })

  it('should handle HTML format', () => {
    expect(format({ format: 'html' })('an ‘<a>’ element')).toBe(
      'An <code>&lt;a&gt;</code> element.'
    )
  })
})

describe('The `linkify` function', () => {
  it('should handle HTML links', () => {
    expect(linkify('html')('Kitty', 'https://hugogiraudel.com')).toBe(
      '<a href="https://hugogiraudel.com" rel="noopener noreferrer" target="_blank">Kitty</a>'
    )
  })

  it('should handle Markdown links', () => {
    expect(linkify('markdown')('Kitty', 'https://hugogiraudel.com')).toBe(
      '[Kitty](https://hugogiraudel.com)'
    )
  })

  it('should not output links in raw format', () => {
    expect(linkify('raw')('Kitty', 'https://hugogiraudel.com')).toBe('Kitty')
  })
})

describe('The `addLineBreaks` function', () => {
  it('should handle HTML line breaks', () => {
    expect(addLineBreaks('html')('itself')).toBe('<br>… itself')
  })

  it('should handle Markdown line breaks', () => {
    expect(addLineBreaks('markdown')('itself')).toBe('  \n… itself')
  })

  it('should handle raw line breaks', () => {
    expect(addLineBreaks('raw')('itself')).toBe('\n… itself')
  })
})
