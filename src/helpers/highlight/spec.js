import highlight from './'

describe('The `highlight` function', () => {
  it('should wrap value with backticks quotes', () => {
    expect(highlight('foo')).toBe('`foo`')
  })
})
