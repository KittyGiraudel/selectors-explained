import getParentNode from './'

const subject = { tagName: 'a', nestingOperator: null, type: 'rule', __id: 1 }

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
