import { enumerate, highlight } from './'

describe('The `enumerate` function', () => {
  it('should return an empty string for an empty collection', () => {
    expect(enumerate([])).toBe('')
  })

  it('should return single item for a one-item collection', () => {
    expect(enumerate(['foo'])).toBe('foo')
  })

  it('should use ‘and’ before the last value', () => {
    expect(enumerate(['foo', 'bar'])).toBe('foo and bar')
  })

  it('should use a comma between other values', () => {
    expect(enumerate(['foo', 'bar', 'baz'])).toBe('foo, bar and baz')
  })
})

describe('The `highlight` function', () => {
  it('should wrap value with curly quotes', () => {
    expect(highlight('foo')).toBe('‘foo’')
  })
})
