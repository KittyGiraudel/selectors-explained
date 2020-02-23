import joinSelectors from './helpers/joinSelectors'
import getSelectors from './helpers/getSelectors'

export default selector =>
  selector
    .split(/\s*,\s*/g)
    .map(selector => joinSelectors(getSelectors(selector)))
