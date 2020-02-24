import getSelectors from './'

describe('The `getSelectors` function', () => {
  it('should return return an array of nodes in reverse depth order', () => {
    const selectors = getSelectors('.foo .bar .baz')
    expect(selectors).toHaveLength(3)
    expect(selectors[0].classNames).toEqual(['baz'])
    expect(selectors[1].classNames).toEqual(['bar'])
    expect(selectors[2].classNames).toEqual(['foo'])
  })
})
