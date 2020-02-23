import explain from './'

describe('Basics', () => {
  it('should throw if the given selector is not a string', () => {
    expect(() => explain()).toThrow()
    expect(() => explain({})).toThrow()
  })
})

describe('Element selectors', () => {
  it('should handle the wildcard selector', () => {
    expect(explain('*')).toBe('an element')
  })

  it('should handle element selectors', () => {
    expect(explain('a')).toBe('a <a> element')
  })
})

describe('Id selectors', () => {
  it('should handle id selectors', () => {
    expect(explain('#foo')).toBe('the element with id ‘foo’')
  })
})

describe('Class selectors', () => {
  it('should handle a single class selector', () => {
    expect(explain('.foo')).toBe('an element with class ‘foo’')
  })

  it('should handle a 2 class selectors', () => {
    expect(explain('.foo.bar')).toBe('an element with classes ‘foo’ and ‘bar’')
  })

  it('should handle more than 2 class selectors', () => {
    expect(explain('.foo.bar.baz')).toBe(
      'an element with classes ‘foo’, ‘bar’ and ‘baz’'
    )
  })

  it('should handle element and class selectors', () => {
    expect(explain('a.bar')).toBe('a <a> element with class ‘bar’')
  })

  it('should handle id and class selectors', () => {
    expect(explain('#foo.bar')).toBe(
      'the element with id ‘foo’ and class ‘bar’'
    )
  })
})

describe('Attribute selectors', () => {
  it('should handle an attribute selector without value', () => {
    expect(explain('[data-foo]')).toBe(
      'an element with an attribute ‘data-foo’'
    )
  })

  it('should handle multiple attribute selectors without value', () => {
    expect(explain('[data-foo][data-bar]')).toBe(
      'an element with an attribute ‘data-foo’ and an attribute ‘data-bar’'
    )
  })

  it('should handle an attribute selector with a value', () => {
    expect(explain('[data-foo="bar"]')).toBe(
      'an element with an attribute ‘data-foo’ whose value is ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the contains operator', () => {
    expect(explain('[data-foo*="bar"]')).toBe(
      'an element with an attribute ‘data-foo’ whose value contains ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the starts with operator', () => {
    expect(explain('[data-foo^="bar"]')).toBe(
      'an element with an attribute ‘data-foo’ whose value starts with ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the ends with operator', () => {
    expect(explain('[data-foo$="bar"]')).toBe(
      'an element with an attribute ‘data-foo’ whose value ends with ‘bar’'
    )
  })

  it('should handle multiple attribute selector with and without a value', () => {
    expect(explain('[data-foo="bar"][data-bar]')).toBe(
      'an element with an attribute ‘data-foo’ whose value is ‘bar’ and an attribute ‘data-bar’'
    )
  })
})

describe('Pseudo-classes', () => {
  it('should handle the :hover pseudo-class', () => {
    expect(explain('a:hover')).toBe('a hovered <a> element')
  })

  it('should handle the :active pseudo-class', () => {
    expect(explain('a:active')).toBe('a active <a> element')
  })

  it('should handle the :focus pseudo-class', () => {
    expect(explain('a:focus')).toBe('a focused <a> element')
  })

  it('should handle the :checked pseudo-class', () => {
    expect(explain('a:checked')).toBe('a checked <a> element')
  })

  it('should handle multiple pseudo-classes', () => {
    expect(explain('a:hover:focus')).toBe('a hovered and focused <a> element')
  })
})

describe('Pseudo-elements', () => {
  it('should handle the ::before pseudo-element', () => {
    expect(explain('a::before')).toBe(
      'the ‘before’ pseudo-element of a <a> element'
    )
  })

  it('should handle the ::after pseudo-element', () => {
    expect(explain('a::after')).toBe(
      'the ‘after’ pseudo-element of a <a> element'
    )
  })

  it('should handle the ::first-line pseudo-element', () => {
    expect(explain('a::first-line')).toBe(
      'the ‘first-line’ pseudo-element of a <a> element'
    )
  })

  it('should handle an arbitrary pseudo-element', () => {
    expect(explain('a::foobar')).toBe(
      'the ‘foobar’ pseudo-element of a <a> element'
    )
  })

  it('should handle pseudo-elements with a single colon', () => {
    expect(explain('a:before')).toBe(
      'the ‘before’ pseudo-element of a <a> element'
    )
  })
})

describe('Combinators', () => {
  it('should handle regular descendance', () => {
    expect(explain('p a')).toBe('a <a> element within a <p> element')
  })

  it('should handle regular descendance', () => {
    expect(explain('#id .foo a')).toBe(
      'a <a> element within an element with class ‘foo’ itself within the element with id ‘id’'
    )
  })

  it('should handle direct descendance', () => {
    expect(explain('.foo p > a')).toBe(
      'a <a> element directly within a <p> element itself within an element with class ‘foo’'
    )
  })
})
