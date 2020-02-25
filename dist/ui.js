import explain from '../selectors-explained'
import { default as specify } from 'specimen'

const App = {
  $: {
    form: document.querySelector('#form'),
    input: document.querySelector('#selector'),
    result: document.querySelector('#result'),
    specificity: document.querySelector('#specificity'),
  },

  options: { format: 'html', links: true, lineBreaks: true },

  results: null,

  init: function() {
    this.prefillFromURL()
    this.$.form.addEventListener('submit', event => {
      event.preventDefault()
      this.displayResults(this.$.input.value)
    })
  },

  updateQueryParam: function(value) {
    const params = new URLSearchParams(window.location.search)
    if (!value) params.delete('s')
    else params.set('s', encodeURIComponent(value))
    history.pushState(null, '', '?' + params.toString())
  },

  prefillFromURL: function() {
    const params = new URLSearchParams(window.location.search)

    if (params.has('s')) {
      try {
        this.$.input.value = decodeURIComponent(params.get('s'))
        this.displayResults(this.$.input.value)
      } catch (error) {
        this.clear('')
      }
    }
  },

  clear: function() {
    this.results = null
    this.$.result.innerHTML = ''
    this.$.specificity.innerHTML = ''
    this.updateQueryParam('')
  },

  create: function(type, value, attrs = {}) {
    const element = document.createElement(type)
    if (value) {
      element.innerHTML = value
    }
    for (let attr in attrs) {
      element.setAttribute(attr, attrs[attr])
    }
    return element
  },

  displaySpecificity: function(specificity) {
    const isDeep = Array.isArray(specificity[0])
    const content = isDeep
      ? specificity.map(item => item.join(', ')).join('; ')
      : specificity.join(', ')
    const $link = this.create('a', 'Specificity', {
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
      target: '_blank',
      rel: 'noopener noreferrer',
    })

    this.$.specificity.innerHTML = ''
    this.$.specificity.appendChild(
      this.create('p', $link.outerHTML + ': ' + content)
    )
  },

  displayResults: function(value) {
    let specificity = this.clear()

    if (value.indexOf(':not(') > -1) {
      return this.$.result.appendChild(
        this.create(
          'p',
          'The <code>:not()</code> pseudo-class is not supported.'
        )
      )
    }

    try {
      this.results = explain(value, this.options)
      specificity = specify(value)
    } catch (error) {
      this.results = null
      specificity = null
      this.$.result.appendChild(this.create('p', error.message))
      return
    }

    this.updateQueryParam(value)
    this.displaySpecificity(specificity)

    // Handle a single selector as a paragraph
    if (this.results.length === 1) {
      this.$.result.appendChild(this.create('p', this.results[0]))
    } else {
      // Handle multiple selectors as an unordered list
      const $ol = this.create('ol')
      this.results.forEach(result => {
        $ol.appendChild(this.create('li', result))
      })
      this.$.result.appendChild($ol)
    }
  },
}

export default App
