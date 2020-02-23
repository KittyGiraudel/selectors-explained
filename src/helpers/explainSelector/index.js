import as from '../as'
import getSelectorDetails from '../getSelectorDetails'
import parsePseudoClasses from '../parsePseudoClasses'

export default selector =>
  [as, getSelectorDetails, parsePseudoClasses]
    .map(fn => fn(selector))
    .filter(Boolean)
    .join(' ')
