import highlight from '../highlight'

export default ({ id }) => (id ? `id ${highlight(id)}` : '')
