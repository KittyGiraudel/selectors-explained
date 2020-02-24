import explainSelector from './'

describe('The `explainSelector` function', () => {
  it('handle regular descendance', () => {
    expect(explainSelector('.foo .bar')).toContain('within')
  })

  it('handle direct descendance', () => {
    expect(explainSelector('.foo > .bar')).toContain('directly within')
  })

  it('handle siblings', () => {
    expect(explainSelector('.foo ~ .bar')).toContain('after')
  })

  it('handle direct siblings', () => {
    expect(explainSelector('.foo + .bar')).toContain('directly adjacent')
  })
})
