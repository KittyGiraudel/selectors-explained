import { getAST, getDeepestNode, getParentNode } from '../ast'

/**
 * Returns an array of selector nodes as provided by the AST, from the selector
 * subject, to the oldest ancestor.
 * @param {String} selector - Single selector (no comma), as a string
 * @returns {Object[]}
 */
export default selector => {
  // Get the AST for the given selector.
  const ast = getAST(selector)
  // Find the deepest node, which is the selector subject.
  const subject = getDeepestNode(ast)
  // Build an array of selectors, starting from the subject, and walking up the
  // tree parent after parent.
  const selectors = [subject]
  let parent = null

  while ((parent = getParentNode(ast, parent || subject))) {
    selectors.push(parent)
  }

  return selectors
}
