export default singular => items => {
  if (items.length === 1) return singular
  else {
    if (singular.endsWith('s')) return singular + 'es'
    else return singular + 's'
  }
}
