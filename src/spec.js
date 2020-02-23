import explain from './'

describe('Basics', () => {
  it('should throw if the given selector is not a string', () => {
    expect(() => explain()).toThrow()
    expect(() => explain({})).toThrow()
  })

  it('should always return an array', () => {
    expect(Array.isArray(explain('.foo'))).toBe(true)
  })
})

describe('Element selectors', () => {
  it('should handle the wildcard selector', () => {
    expect(explain('*')[0]).toBe('an element')
  })

  it('should handle element selectors', () => {
    expect(explain('a')[0]).toBe('a <a> element')
  })
})

describe('Id selectors', () => {
  it('should handle id selectors', () => {
    expect(explain('#foo')[0]).toBe('the element with id ‘foo’')
  })
})

describe('Class selectors', () => {
  it('should handle a single class selector', () => {
    expect(explain('.foo')[0]).toBe('an element with class ‘foo’')
  })

  it('should handle a 2 class selectors', () => {
    expect(explain('.foo.bar')[0]).toBe(
      'an element with classes ‘foo’ and ‘bar’'
    )
  })

  it('should handle more than 2 class selectors', () => {
    expect(explain('.foo.bar.baz')[0]).toBe(
      'an element with classes ‘foo’, ‘bar’ and ‘baz’'
    )
  })

  it('should handle element and class selectors', () => {
    expect(explain('a.bar')[0]).toBe('a <a> element with class ‘bar’')
  })

  it('should handle id and class selectors', () => {
    expect(explain('#foo.bar')[0]).toBe(
      'the element with id ‘foo’ and class ‘bar’'
    )
  })
})

describe('Attribute selectors', () => {
  it('should handle an attribute selector without value', () => {
    expect(explain('[data-foo]')[0]).toBe(
      'an element with an attribute ‘data-foo’'
    )
  })

  it('should handle multiple attribute selectors without value', () => {
    expect(explain('[data-foo][data-bar]')[0]).toBe(
      'an element with an attribute ‘data-foo’ and an attribute ‘data-bar’'
    )
  })

  it('should handle an attribute selector with a value', () => {
    expect(explain('[data-foo="bar"]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value is ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the contains operator', () => {
    expect(explain('[data-foo*="bar"]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value contains ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the contains strictly operator', () => {
    expect(explain('[data-foo~="bar"]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value is a whitespace-separated list of words, one of which is ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the contains with hyphen operator', () => {
    expect(explain('[data-foo|="bar"]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value is ‘bar’ or starts with ‘bar-’'
    )
  })

  it('should handle an attribute selector with a value and the starts with operator', () => {
    expect(explain('[data-foo^="bar"]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value starts with ‘bar’'
    )
  })

  it('should handle an attribute selector with a value and the ends with operator', () => {
    expect(explain('[data-foo$="bar"]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value ends with ‘bar’'
    )
  })

  it('should handle multiple attribute selector with and without a value', () => {
    expect(explain('[data-foo="bar"][data-bar]')[0]).toBe(
      'an element with an attribute ‘data-foo’ whose value is ‘bar’ and an attribute ‘data-bar’'
    )
  })
})

describe('Pseudo-classes', () => {
  it('should handle the :hover pseudo-class', () => {
    expect(explain('a:hover')[0]).toBe('a <a> element provided it is hovered')
  })

  it('should handle the :active pseudo-class', () => {
    expect(explain('a:active')[0]).toBe('a <a> element provided it is active')
  })

  it('should handle the :focus pseudo-class', () => {
    expect(explain('a:focus')[0]).toBe('a <a> element provided it is focused')
  })

  it('should handle the :checked pseudo-class', () => {
    expect(explain('a:checked')[0]).toBe('a <a> element provided it is checked')
  })

  it('should handle the :invalid pseudo-class', () => {
    expect(explain('a:invalid')[0]).toBe('a <a> element provided it is invalid')
  })

  it('should handle multiple pseudo-classes', () => {
    expect(explain('a:hover:focus')[0]).toBe(
      'a <a> element provided it is hovered and focused'
    )
  })
})

describe('Pseudo-elements', () => {
  it('should handle the ::before pseudo-element', () => {
    expect(explain('a::before')[0]).toBe(
      'the ‘before’ pseudo-element of a <a> element'
    )
  })

  it('should handle the ::after pseudo-element', () => {
    expect(explain('a::after')[0]).toBe(
      'the ‘after’ pseudo-element of a <a> element'
    )
  })

  it('should handle the ::first-line pseudo-element', () => {
    expect(explain('a::first-line')[0]).toBe(
      'the ‘first-line’ pseudo-element of a <a> element'
    )
  })

  it('should handle an arbitrary pseudo-element', () => {
    expect(explain('a::foobar')[0]).toBe(
      'the ‘foobar’ pseudo-element of a <a> element'
    )
  })

  it('should handle pseudo-elements with a single colon', () => {
    expect(explain('a:before')[0]).toBe(
      'the ‘before’ pseudo-element of a <a> element'
    )
  })
})

describe('Combinators', () => {
  it('should handle regular descendance', () => {
    expect(explain('p a')[0]).toBe('a <a> element within a <p> element')
  })

  it('should handle regular descendance', () => {
    expect(explain('#id .foo a')[0]).toBe(
      'a <a> element within an element with class ‘foo’ itself within the element with id ‘id’'
    )
  })

  it('should handle direct descendance', () => {
    expect(explain('.foo p > a')[0]).toBe(
      'a <a> element directly within a <p> element itself within an element with class ‘foo’'
    )
  })
})

describe('Multiple selectors', () => {
  it('should handle multiple selectors', () => {
    expect(explain('.foo, .bar')).toEqual([
      'an element with class ‘foo’',
      'an element with class ‘bar’',
    ])
  })
})
