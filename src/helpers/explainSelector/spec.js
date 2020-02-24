import { getAST } from '../ast'
import explainSelector from './'

describe('The `explainSelector` function', () => {
  it('handle regular descendance', () => {
    const ast = getAST('.foo .bar')
    expect(explainSelector([ast.rule.rule, ast.rule])).toContain('within')
  })

  it('handle direct descendance', () => {
    const ast = getAST('.foo > .bar')
    expect(explainSelector([ast.rule.rule, ast.rule])).toContain(
      'directly within'
    )
  })

  it('handle siblings', () => {
    const ast = getAST('.foo ~ .bar')
    expect(explainSelector([ast.rule.rule, ast.rule])).toContain('after')
  })

  it('handle direct siblings', () => {
    const ast = getAST('.foo + .bar')
    expect(explainSelector([ast.rule.rule, ast.rule])).toContain(
      'directly adjacent'
    )
  })
})
