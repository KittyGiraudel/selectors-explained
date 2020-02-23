import as from '../as'
import getSelectorContext from '../getSelectorContext'
import getSelectorDetails from '../getSelectorDetails'

export default selector =>
  [as(selector), getSelectorDetails(selector)].filter(Boolean).join(' ')
