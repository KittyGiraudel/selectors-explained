import {
  parseAttributes,
  parseClasses,
  parsePseudoClasses,
  parsePseudoElement,
} from './'
import * as CSSwhat from 'css-what'

describe('The `parseAttributes` helper', () => {
  it('should handle an attribute selector without value', () => {
    expect(parseAttributes({ attrs: [{ name: 'data-foo' }] })).toBe(
      'an attribute ‘data-foo’'
    )
  })

  it('should handle multiple attribute selectors without value', () => {
    expect(
      parseAttributes({ attrs: [{ name: 'data-foo' }, { name: 'data-bar' }] })
    ).toBe('an attribute ‘data-foo’ and an attribute ‘data-bar’')
  })

  it('should handle an attribute selector with a value', () => {
    expect(
      parseAttributes({
        attrs: [{ name: 'data-foo', value: 'bar', action: 'equals' }],
      })
    ).toBe('an attribute ‘data-foo’ whose value is ‘bar’')
  })

  it('should handle an attribute selector with a value and the contains operator', () => {
    expect(
      parseAttributes({
        attrs: [{ name: 'data-foo', value: 'bar', action: 'any' }],
      })
    ).toBe('an attribute ‘data-foo’ whose value contains ‘bar’')
  })

  it('should handle an attribute selector with a value and the contains strictly operator', () => {
    expect(
      parseAttributes({
        attrs: [{ name: 'data-foo', value: 'bar', action: 'element' }],
      })
    ).toBe(
      'an attribute ‘data-foo’ whose value is a space-separated list of values, one of which is ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the contains with hyphen operator', () => {
    expect(
      parseAttributes({
        attrs: [{ name: 'data-foo', value: 'bar', action: 'hyphen' }],
      })
    ).toBe(
      'an attribute ‘data-foo’ whose value is an hyphen-separated list of values, one of which is ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the starts with operator', () => {
    expect(
      parseAttributes({
        attrs: [{ name: 'data-foo', value: 'bar', action: 'start' }],
      })
    ).toBe('an attribute ‘data-foo’ whose value starts with ‘bar’')
  })

  it('should handle an attribute selector with a value and the ends with operator', () => {
    expect(
      parseAttributes({
        attrs: [{ name: 'data-foo', value: 'bar', action: 'end' }],
      })
    ).toBe('an attribute ‘data-foo’ whose value ends with ‘bar’')
  })

  it('should handle multiple attribute selector with and without a value', () => {
    expect(
      parseAttributes({
        attrs: [
          { name: 'data-foo', value: 'bar', action: 'equals' },
          { name: 'data-bar' },
        ],
      })
    ).toBe(
      'an attribute ‘data-foo’ whose value is ‘bar’ and an attribute ‘data-bar’'
    )
  })
})

describe('The `parseClasses` helper', () => {
  it('should return an empty string for no classes', () => {
    expect(parseClasses({})).toBe('')
    expect(parseClasses({ classes: [] })).toBe('')
  })

  it('should handle a single class selector', () => {
    expect(parseClasses({ classes: ['foo'] })).toBe('class ‘foo’')
  })

  it('should handle 2 class selectors', () => {
    expect(parseClasses({ classes: ['foo', 'bar'] })).toBe(
      'classes ‘foo’ and ‘bar’'
    )
  })

  it('should handle more than 2 class selectors', () => {
    expect(parseClasses({ classes: ['foo', 'bar', 'baz'] })).toBe(
      'classes ‘foo’, ‘bar’ and ‘baz’'
    )
  })
})

describe('The `parsePseudoClasses` helper', () => {
  it('should handle :hover', () => {
    expect(parsePseudoClasses({ pseudoClasses: [{ name: 'hover' }] })).toBe(
      'provided it is hovered'
    )
  })

  it('should handle :active', () => {
    expect(parsePseudoClasses({ pseudoClasses: [{ name: 'active' }] })).toBe(
      'provided it is active'
    )
  })

  it('should handle :focus', () => {
    expect(parsePseudoClasses({ pseudoClasses: [{ name: 'focus' }] })).toBe(
      'provided it is focused'
    )
  })

  it('should handle :checked', () => {
    expect(parsePseudoClasses({ pseudoClasses: [{ name: 'checked' }] })).toBe(
      'provided it is checked'
    )
  })

  it('should handle multiple pseudo-classes', () => {
    expect(
      parsePseudoClasses({
        pseudoClasses: [{ name: 'checked' }, { name: 'hover' }],
      })
    ).toBe('provided it is checked and hovered')
  })

  it('should handle :is()', () => {
    const [[isToken]] = CSSwhat.parse(':is(.foo, .bar)')

    expect(parsePseudoClasses({ pseudoClasses: [isToken] })).toBe(
      'provided it is matching ‘.foo, .bar’'
    )
  })

  it('should handle :where()', () => {
    const [[whereToken]] = CSSwhat.parse(':where(main nav)')

    expect(parsePseudoClasses({ pseudoClasses: [whereToken] })).toBe(
      'provided it is matching ‘main nav’ (without adding specificity)'
    )
  })

  it('should handle :has()', () => {
    const [[hasToken]] = CSSwhat.parse(':has(img[alt])')

    expect(parsePseudoClasses({ pseudoClasses: [hasToken] })).toBe(
      'provided it is having related elements that match ‘img[alt]’'
    )
  })

  it('should handle :not()', () => {
    const [[notToken]] = CSSwhat.parse(':not(.foo)')

    expect(parsePseudoClasses({ pseudoClasses: [notToken] })).toBe(
      'provided it is not matching ‘.foo’'
    )
  })
})

describe('The `parsePseudoElement` helper', () => {
  it('should handle ::before', () => {
    expect(parsePseudoElement({ pseudoElements: [{ name: 'before' }] })).toBe(
      'the ‘before’ pseudo-element of '
    )
  })

  it('should handle ::after', () => {
    expect(parsePseudoElement({ pseudoElements: [{ name: 'after' }] })).toBe(
      'the ‘after’ pseudo-element of '
    )
  })

  it('should handle ::first-line', () => {
    expect(
      parsePseudoElement({ pseudoElements: [{ name: 'first-line' }] })
    ).toBe('the first line of ')
  })

  it('should handle ::first-letter', () => {
    expect(
      parsePseudoElement({ pseudoElements: [{ name: 'first-letter' }] })
    ).toBe('the first letter of ')
  })

  it('should handle an arbitrary pseudo-element', () => {
    expect(parsePseudoElement({ pseudoElements: [{ name: 'foobar' }] })).toBe(
      'the ‘foobar’ pseudo-element of '
    )
  })
})
