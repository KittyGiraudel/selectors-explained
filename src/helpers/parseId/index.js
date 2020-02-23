import withQuotes from '../withQuotes'

export default ({ id }) => (id ? `id ${withQuotes(id)}` : '')
