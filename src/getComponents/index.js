import { RELATIONSHIPS, DEFAULT_NODE, PSEUDO_ELEMENTS } from '../constants'
import { clone } from '../utils'

/**
 * Returns an array of components as provided by the css-what AST, from the
 * selector subject, to the oldest ancestor.
 * See: https://github.com/fb55/css-what
 * @param {Object[]} ast - AST of a selector
 * @returns {Object[]}
 */
export default ast =>
  ast.reduce(
    (acc, token) => {
      const { type, name, value } = token
      const current = acc[0]

      if (RELATIONSHIPS.includes(type)) {
        acc.unshift({ ...clone(DEFAULT_NODE), relationship: type })
        return acc
      }

      switch (type) {
        case 'universal': {
          current.tagName = '*'
          break
        }
        case 'tag': {
          current.tagName = name
          break
        }
        case 'attribute': {
          if (name === 'id') current.id = value
          else if (name === 'class') current.classes.push(value)
          else current.attrs.push(token)
          break
        }
        case 'pseudo': {
          if (Object.keys(PSEUDO_ELEMENTS).includes(token.name)) {
            current.pseudoElements.push(token)
          } else {
            current.pseudoClasses.push(token)
          }
          break
        }
        case 'pseudo-element': {
          current.pseudoElements.push(token)
          break
        }
      }

      return acc
    },
    [clone(DEFAULT_NODE)]
  )
