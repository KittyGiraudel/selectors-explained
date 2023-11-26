import getSelectorSubject from './'

describe('The `getSelectorSubject` function', () => {
  it('should handle the wildcard selector', () => {
    expect(getSelectorSubject({ tagName: '*' })).toBe('any element')
  })

  it('should handle element selectors', () => {
    expect(getSelectorSubject({ tagName: 'foo' })).toBe('a ‘<foo>’ element')
  })

  it('should handle unique element selectors', () => {
    expect(getSelectorSubject({ tagName: 'html' })).toBe('the ‘<html>’ element')
    expect(getSelectorSubject({ tagName: 'body' })).toBe('the ‘<body>’ element')
    expect(getSelectorSubject({ tagName: 'head' })).toBe('the ‘<head>’ element')
  })   

  it('should handle id selectors', () => {
    expect(getSelectorSubject({ id: 'foo' })).toBe('the element')
  })
})
