import { getAST } from '../ast'
import joinSelectors from './'

describe('The `joinSelectors` function', () => {
  it('handle regular descendance', () => {
    const ast = getAST('.foo .bar')
    expect(joinSelectors([ast.rule.rule, ast.rule])).toContain('within')
  })

  it('handle direct descendance', () => {
    const ast = getAST('.foo > .bar')
    expect(joinSelectors([ast.rule.rule, ast.rule])).toContain(
      'directly within'
    )
  })

  it('handle siblings', () => {
    const ast = getAST('.foo ~ .bar')
    expect(joinSelectors([ast.rule.rule, ast.rule])).toContain('after')
  })

  it('handle direct siblings', () => {
    const ast = getAST('.foo + .bar')
    expect(joinSelectors([ast.rule.rule, ast.rule])).toContain(
      'directly adjacent'
    )
  })
})
