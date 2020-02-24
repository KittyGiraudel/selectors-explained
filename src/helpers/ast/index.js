import { CssSelectorParser } from 'css-selector-parser'
const parser = new CssSelectorParser()

parser.registerNestingOperators('>', '+', '~')
parser.registerAttrEqualityMods('^', '$', '*', '~', '|')
parser.enableSubstitutes()

export const addIdentifiers = ast => {
  let id = 0
  let node = ast.rule

  node.__id = id++

  while (node.rule && node.rule.type === 'rule') {
    node = node.rule
    node.__id = id++
  }
}

export const getAST = selector => {
  try {
    const ast = parser.parse(selector)

    if (ast.type !== 'ruleSet') {
      throw new Error('Unsupported CSS selector')
    }

    // Mutate the AST to add incremental IDs. This is necessary to be able to
    // find the parent of a given node, since nodes don’t have IDs by default.
    addIdentifiers(ast)

    return ast
  } catch (error) {
    throw new Error('Invalid CSS selector')
  }
}

export const getParentNode = (ast, node) => {
  let current = ast

  while (current.rule && current.__id !== node.__id - 1) {
    current = current.rule
  }

  return current.__id === node.__id - 1 ? current : null
}

export const getDeepestNode = ast => {
  let subject = ast.rule

  while (subject.rule && subject.rule.type === 'rule') {
    subject = subject.rule
  }

  return subject
}
