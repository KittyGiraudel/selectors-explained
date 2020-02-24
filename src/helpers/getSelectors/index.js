import { getAST, getDeepestNode, getParentNode } from '../ast'

export default selector => {
  // Get the AST for the given selector.
  const ast = getAST(selector)
  const subject = getDeepestNode(ast)
  const selectors = [subject]
  let parent = null

  while ((parent = getParentNode(ast, parent || subject))) {
    selectors.push(parent)
  }

  return selectors
}
