import as from '../as'
import getSelectorDetails from '../getSelectorDetails'
import getSelectorContext from '../getSelectorContext'

export default selector =>
  [as, getSelectorDetails, getSelectorContext]
    .map(fn => fn(selector))
    .filter(Boolean)
    .join(' ')
