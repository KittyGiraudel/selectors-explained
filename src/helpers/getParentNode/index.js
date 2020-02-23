export default (ast, node) => {
  let current = ast

  while (current.rule && current.__id !== node.__id - 1) {
    current = current.rule
  }

  return current.__id === node.__id - 1 ? current : null
}
