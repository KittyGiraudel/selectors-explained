import parseSelector from './'

describe('The `parseSelector` function', () => {
  it('should throw if selector cannot be parsed', () => {
    expect(() => parseSelector()).toThrow()
  })
})
