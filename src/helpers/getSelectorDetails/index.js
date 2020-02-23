import parseAttributes from '../parseAttributes'
import parseClasses from '../parseClasses'
import parseId from '../parseId'

export default selector => {
  const components = [parseId, parseClasses, parseAttributes]
    .map(fn => fn(selector))
    .filter(Boolean)

  return components.reduce((acc, item, index) => {
    if (index === 0) return acc + 'with ' + item
    else return acc + ' and ' + item
  }, '')
}
