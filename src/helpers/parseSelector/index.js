import { CssSelectorParser } from 'css-selector-parser'
const parser = new CssSelectorParser()

parser.registerSelectorPseudos('has')
parser.registerNestingOperators('>', '+', '~')
parser.registerAttrEqualityMods('^', '$', '*', '~')
parser.enableSubstitutes()

export default selector => {
  try {
    const ast = parser.parse(selector)

    if (ast.type !== 'ruleSet') {
      throw new Error('Unsupported CSS selector')
    }

    return ast
  } catch (error) {
    throw new Error('Invalid CSS selector')
  }
}
