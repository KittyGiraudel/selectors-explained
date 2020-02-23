export default items => {
  return items.reduce((acc, item, index) => {
    if (index === 0) return acc + item
    if (index === items.length - 1) return acc + ' and ' + item
    else return acc + ', ' + item
  }, '')
}
