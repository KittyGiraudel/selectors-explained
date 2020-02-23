import parsePseudoClasses from '../parsePseudoClasses'

export default selector => {
  const pseudoClasses = parsePseudoClasses(selector)

  return pseudoClasses ? 'provided it is ' + pseudoClasses : ''
}
