import as from './'

describe('The `as` function', () => {
  it('should handle the wildcard selector', () => {
    expect(as({ tagName: '*' })).toBe('an element')
  })

  it('should handle element selectors', () => {
    expect(as({ tagName: 'foo' })).toBe('a <foo> element')
  })

  it('should handle unique element selectors', () => {
    expect(as({ tagName: 'html' })).toBe('the <html> element')
    expect(as({ tagName: 'body' })).toBe('the <body> element')
    expect(as({ tagName: 'head' })).toBe('the <head> element')
  })

  it('should handle id selectors', () => {
    expect(as({ id: 'foo' })).toBe('the element')
  })
})
