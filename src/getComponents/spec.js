import getComponents from './'

describe('The `getComponents` function', () => {
  it('should return return an array of nodes in reverse depth order', () => {
    const selectors = getComponents([
      { name: 'class', type: 'attribute', value: 'foo' },
      { type: 'child' },
      { name: 'class', type: 'attribute', value: 'bar' },
      { type: 'child' },
      { name: 'class', type: 'attribute', value: 'baz' },
    ])
    expect(selectors).toHaveLength(3)
    expect(selectors[0].classes).toEqual(['baz'])
    expect(selectors[1].classes).toEqual(['bar'])
    expect(selectors[2].classes).toEqual(['foo'])
  })
})
