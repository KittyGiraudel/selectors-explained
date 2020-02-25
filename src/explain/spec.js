import explain from './'

describe('Basics', () => {
  it('should always return an array', () => {
    expect(Array.isArray(explain('.foo'))).toBe(true)
  })

  it('should handle multiple selectors', () => {
    expect(explain('.foo, .bar')).toEqual([
      'An element with class ‘foo’.',
      'An element with class ‘bar’.',
    ])
  })
})
