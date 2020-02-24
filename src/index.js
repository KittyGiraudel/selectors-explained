import joinSelectors from './helpers/joinSelectors'
import getSelectors from './helpers/getSelectors'
import toHTML from './helpers/toHTML'

export default (selector, options = {}) => {
  const data = selector
    .split(/\s*,\s*/g)
    .map(selector => joinSelectors(getSelectors(selector)))

  return options.html ? data.map(toHTML) : data
}
