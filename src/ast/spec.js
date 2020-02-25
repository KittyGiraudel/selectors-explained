import { CssSelectorParser } from 'css-selector-parser'
import { getAST, addIdentifiers, getDeepestNode, getParentNode } from './'

const parser = new CssSelectorParser()

const subject = { tagName: 'a', nestingOperator: null, type: 'rule', __id: 1 }

describe('The `getAST` function', () => {
  it('should throw if selector cannot be parsed', () => {
    expect(() => getAST()).toThrow()
    expect(() => getAST({})).toThrow()
  })

  it('should add incremental ids for back walking', () => {
    const ast = parser.parse('.foo .bar .baz')

    addIdentifiers(ast)

    expect(ast.rule.__id).toBe(0)
    expect(ast.rule.rule.__id).toBe(1)
    expect(ast.rule.rule.rule.__id).toBe(2)
  })
})

describe('The `getDeepestNode` function', () => {
  it('should return fin the deepest node in AST', () => {
    expect(getDeepestNode(parser.parse('.foo')).classNames).toEqual(['foo'])
    expect(getDeepestNode(parser.parse('.foo .bar')).classNames).toEqual([
      'bar',
    ])
    expect(getDeepestNode(parser.parse('.foo .bar .baz')).classNames).toEqual([
      'baz',
    ])
  })
})

describe('The `getParentNode` function', () => {
  it('should return null for an empty AST', () => {
    expect(getParentNode({}, subject)).toBe(null)
  })

  it('should return null when there is no parent node', () => {
    expect(
      getParentNode(
        {
          type: 'ruleSet',
          rule: subject,
        },
        subject
      )
    ).toBe(null)
  })

  it('should find the parent node', () => {
    const AST = {
      type: 'ruleSet',
      rule: {
        tagName: 'p',
        type: 'rule',
        rule: subject,
        __id: 0,
      },
    }

    expect(getParentNode(AST, subject)).toBe(AST.rule)
  })
})
