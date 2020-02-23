import withQuotes from './'

describe('The `withQuotes` function', () => {
  it('should wrap value with single curly quotes', () => {
    expect(withQuotes('foo')).toBe('‘foo’')
  })
})
