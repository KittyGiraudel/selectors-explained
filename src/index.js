import joinSelectors from './helpers/joinSelectors'
import getSelectors from './helpers/getSelectors'

export default selector => joinSelectors(getSelectors(selector))
