import { CssSelectorParser } from 'css-selector-parser'
import findSubject from './'

const parser = new CssSelectorParser()

describe('The `findSubject` function', () => {
  it('should return fin the deepest node in AST', () => {
    expect(findSubject(parser.parse('.foo')).classNames).toEqual(['foo'])
    expect(findSubject(parser.parse('.foo .bar')).classNames).toEqual(['bar'])
    expect(findSubject(parser.parse('.foo .bar .baz')).classNames).toEqual([
      'baz',
    ])
  })

  it('should add incremental ids for back walking', () => {
    const ast = parser.parse('.foo .bar .baz')

    findSubject(ast)

    expect(ast.rule.__id).toBe(0)
    expect(ast.rule.rule.__id).toBe(1)
    expect(ast.rule.rule.rule.__id).toBe(2)
  })
})
