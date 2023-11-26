import explain from './'

describe('Basics', () => {
  it('should always return an array', () => {
    expect(Array.isArray(explain('.foo'))).toBe(true)
  })

  it('should handle multiple selectors', () => {
    expect(explain('.foo, .bar')).toEqual([
      'An element with class ‘foo’.',
      'An element with class ‘bar’.',
    ])
  })
})

describe('Smoke', () => {
  const tests = {
    // Elements
    '*': 'Any element',
    p: 'A ‘<p>’ element',
    a: 'An ‘<a>’ element',

    // Classes
    '.foo': 'An element with class ‘foo’',
    '.foo.bar': 'An element with classes ‘foo’ and ‘bar’',
    '.foo.bar.baz': 'An element with classes ‘foo’, ‘bar’ and ‘baz’',
    'p.foo': 'A ‘<p>’ element with class ‘foo’',

    // ID
    '#foo': 'The element with id ‘foo’',
    'p#foo': 'The ‘<p>’ element with id ‘foo’',

    // Attributes
    'a[href]': 'An ‘<a>’ element with an attribute ‘href’',
    'a[href=""]':
      'An ‘<a>’ element with an attribute ‘href’ whose value is empty',
    'a[target="_blank"]':
      'An ‘<a>’ element with an attribute ‘target’ whose value is ‘_blank’',
    'a[href^="mailto:"]':
      'An ‘<a>’ element with an attribute ‘href’ whose value starts with ‘mailto:’',
    'a[href$=".pdf"]':
      'An ‘<a>’ element with an attribute ‘href’ whose value ends with ‘.pdf’',
    'a[lang|="en"]':
      'An ‘<a>’ element with an attribute ‘lang’ whose value is an hyphen-separated list of values, one of which is ‘en’',
    'a[rel~="noopener"]':
      'An ‘<a>’ element with an attribute ‘rel’ whose value is a space-separated list of values, one of which is ‘noopener’',
    'a[rel*="noopener"]':
      'An ‘<a>’ element with an attribute ‘rel’ whose value contains ‘noopener’',
    'a[target="_blank" i]':
      'An ‘<a>’ element with an attribute ‘target’ whose value is ‘_blank’ (regardless of casing)',

    // Pseudo-classes
    'a:hover': 'An ‘<a>’ element provided it is hovered',
    'a:active': 'An ‘<a>’ element provided it is active',
    'a:focus': 'An ‘<a>’ element provided it is focused',
    'a:visited': 'An ‘<a>’ element provided it is visited',
    'p:empty': 'A ‘<p>’ element provided it is empty',
    'p:blank': 'A ‘<p>’ element provided it is blank',
    'p:target': 'A ‘<p>’ element provided it is targeted',
    'p:lang(en)': 'A ‘<p>’ element provided it is in ‘en’',
    'input:checked': 'An ‘<input>’ element provided it is checked',
    'input:indeterminate': 'An ‘<input>’ element provided it is indeterminate',
    'input:disabled': 'An ‘<input>’ element provided it is disabled',
    'input:optional': 'An ‘<input>’ element provided it is optional',
    'input:valid': 'An ‘<input>’ element provided it is valid',
    'input:invalid': 'An ‘<input>’ element provided it is invalid',
    'input:required': 'An ‘<input>’ element provided it is required',
    'input:read-only': 'An ‘<input>’ element provided it is read-only',
    'input:read-write': 'An ‘<input>’ element provided it is read-write',
    'input:out-of-range': 'An ‘<input>’ element provided it is in-range',
    'input:out-of-range': 'An ‘<input>’ element provided it is out-of-range',
    'li:last-child':
      'A ‘<li>’ element provided it is the last child of its parent',
    'li:first-child':
      'A ‘<li>’ element provided it is the first child of its parent',
    'li:only-child':
      'A ‘<li>’ element provided it is the only child of its parent',
    'li:nth-child':
      'A ‘<li>’ element provided it is the nth child (formula) of its parent',
    'li:nth-last-child':
      'A ‘<li>’ element provided it is the nth from the end child (formula) of its parent',
    'li:last-of-type':
      'A ‘<li>’ element provided it is the last of its type in its parent',
    'li:first-of-type':
      'A ‘<li>’ element provided it is the first of its type in its parent',
    'li:only-of-type':
      'A ‘<li>’ element provided it is the only of its type in its parent',
    'li:nth-of-type':
      'A ‘<li>’ element provided it is the nth of its type (formula) in its parent',
    'li:nth-last-of-type':
      'A ‘<li>’ element provided it is the nth of its type from the end (formula) in its parent',

    // Pseudo-elements
    'a::before': 'The ‘before’ pseudo-element of an ‘<a>’ element',
    'a::after': 'The ‘after’ pseudo-element of an ‘<a>’ element',
    'p::first-line': 'The first line of a ‘<p>’ element',
    'p::first-letter': 'The first letter of a ‘<p>’ element',
    'input::placeholder': 'The placeholder of an ‘<input>’ element',
    'li::marker': 'The marker of a ‘<li>’ element',
    'dialog::backdrop': 'The backdrop of a ‘<dialog>’ element',
    '::selection': 'The highlighted selection of an element',

    // Relationships
    'ul   li': 'A ‘<li>’ element somewhere within an ‘<ul>’ element',
    'ul > li': 'A ‘<li>’ element directly within an ‘<ul>’ element',
    'li + li': 'A ‘<li>’ element directly adjacent to a ‘<li>’ element',
    'li ~ li': 'A ‘<li>’ element after a ‘<li>’ element',
  }

  Object.keys(tests).forEach(selector => {
    it(`should handle: ${selector}`, () => {
      const [actual] = explain(selector)
      const expected = tests[selector]

      expect(actual).toEqual(expected + '.')
    })
  })
})
