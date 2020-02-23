import parseSelector from '../parseSelector'
import findSubject from '../findSubject'
import getParentNode from '../getParentNode'

export default selector => {
  const ast = parseSelector(selector)
  const subject = findSubject(ast)
  const selectors = [subject]
  let parent = null

  while ((parent = getParentNode(ast, parent || subject))) {
    selectors.push(parent)
  }

  return selectors
}
