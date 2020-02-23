import parseAttributes from '../parseAttributes'
import parseClasses from '../parseClasses'
import parseId from '../parseId'

const _with = items => {
  return items.reduce((acc, item, index) => {
    if (index === 0) return acc + 'with ' + item
    else return acc + ' and ' + item
  }, '')
}

export default selector => {
  const components = [parseId, parseClasses, parseAttributes]
    .map(fn => fn(selector))
    .filter(Boolean)

  return _with(components)
}
