var explain = (function () {
  'use strict';

  const PSEUDO_CLASSES = {
    active: 'active',
    // 'any-link': 'any-link',
    blank: 'blank',
    checked: 'checked',
    // 'current': 'current',
    // 'default': 'default',
    // 'defined': 'defined',
    disabled: 'disabled',
    // 'drop': 'drop',
    empty: 'empty',
    enabled: 'enabled',
    // 'first': 'first',
    'first-child': 'the first child of its parent',
    'first-of-type': 'the first of its type in its parent',
    // 'fullscreen': 'fullscreen',
    // 'future': 'future',
    focus: 'focused',
    // 'focus-visible': 'focus-visible',
    // 'focus-within': 'focus-within',
    // 'host': 'host',
    hover: 'hovered',
    // 'indeterminate': 'indeterminate',
    // 'in-range': 'in-range',
    invalid: 'invalid',
    'last-child': 'the last child of its parent',
    'last-of-type': 'the last of its type in its parent',
    // 'left': 'left',
    // 'link': 'link',
    // 'local-link': 'local-link',
    'only-child': 'the only child of its parent',
    'only-of-type': 'the only of its type in its parent',
    optional: 'optional',
    'out-of-range': 'out-of-range',
    // 'past': 'past',
    // 'placeholder-shown': 'placeholder-shown',
    'read-only': 'read-only',
    // 'read-write': 'read-write',
    required: 'required',
    // 'right': 'right',
    // 'root': 'root',
    // 'scope': 'scope',
    target: 'targeted',
    // 'target-within': 'target-within',
    // 'user-invalid': 'user-invalid',
    valid: 'valid',
    visited: 'visited',
  };

  const UNIQUE_ELEMENTS = ['html', 'body', 'head'];

  var withQuotes = item => `‘${item}’`;

  var isPseudoClass = ({ name }) => Object.keys(PSEUDO_CLASSES).includes(name);

  var parsePseudoElement = ({ pseudos = [] }) => {
    const pseudoElement = pseudos.find(
      pseudo => pseudo.name !== '' && !isPseudoClass(pseudo)
    );

    if (pseudoElement) {
      return `the ${withQuotes(pseudoElement.name)} pseudo-element of `
    }

    return ''
  };

  var as = subject => {
    const { id, tagName } = subject;
    const pseudo = parsePseudoElement(subject);
    const tag = tagName && tagName !== '*' ? `<${tagName}>` : '';
    const content = [tag, 'element'].filter(Boolean).join(' ');
    const article =
      id || UNIQUE_ELEMENTS.includes(tagName)
        ? 'the'
        : /^[aeiouy]/.test(content)
        ? 'an'
        : 'a';

    return pseudo + article + ' ' + content
  };

  var enumerate = items => {
    return items.reduce((acc, item, index) => {
      if (index === 0) return acc + item
      if (index === items.length - 1) return acc + ' and ' + item
      else return acc + ', ' + item
    }, '')
  };

  const explainAttrOperator = attr => {
    const value = withQuotes(attr.value);

    switch (attr.operator) {
      case '=':
        return 'is ' + value
      case '*=':
        return 'contains ' + value
      case '^=':
        return 'starts with ' + value
      case '$=':
        return 'ends with ' + value
      case '~=':
        return 'is a whitespace-separated list of words, one of which is ' + value
      case '|=':
        return `is ${value} or starts with ${withQuotes(attr.value + '-')}`
    }
  };

  const explainAttr = attr =>
    'an attribute ' +
    (attr.value
      ? `${withQuotes(attr.name)} whose value ${explainAttrOperator(attr)}`
      : withQuotes(attr.name));

  var parseAttributes = ({ attrs = [] }) => {
    if (attrs.length === 0) {
      return ''
    }

    return enumerate(attrs.map(explainAttr))
  };

  var parseClasses = ({ classNames = [] }) => {
    if (classNames.length === 0) {
      return ''
    }

    if (classNames.length === 1) {
      return 'class ' + withQuotes(classNames[0])
    }

    return 'classes ' + enumerate(classNames.map(withQuotes))
  };

  var parseId = ({ id }) => (id ? `id ${withQuotes(id)}` : '');

  var getSelectorDetails = selector => {
    const components = [parseId, parseClasses, parseAttributes]
      .map(fn => fn(selector))
      .filter(Boolean);

    return components.reduce((acc, item, index) => {
      if (index === 0) return acc + 'with ' + item
      else return acc + ' and ' + item
    }, '')
  };

  var parsePseudoClasses = ({ pseudos = [] }) => {
    const pseudoClasses = pseudos
      .filter(isPseudoClass)
      .map(pseudo => PSEUDO_CLASSES[pseudo.name]);

    return pseudoClasses.length > 0
      ? `provided it is ${enumerate(pseudoClasses)}`
      : ''
  };

  var explainSelector = selector =>
    [as, getSelectorDetails, parsePseudoClasses]
      .map(fn => fn(selector))
      .filter(Boolean)
      .join(' ');

  const explainContext = ({ nestingOperator }) => {
    switch (nestingOperator) {
      case '>':
        return ' directly within '
      case '+':
        return ' directly after '
      case '~':
        return ' after '
      default:
        return ' within '
    }
  };

  var joinSelectors = selectors =>
    selectors.reduce((acc, selector, index) => {
      const outcome = acc + explainSelector(selector);

      if (index === selectors.length - 1) {
        return outcome
      }

      return outcome + (index === 0 ? '' : ' itself') + explainContext(selector)
    }, '');

  function CssSelectorParser() {
    this.pseudos = {};
    this.attrEqualityMods = {};
    this.ruleNestingOperators = {};
    this.substitutesEnabled = false;
  }

  CssSelectorParser.prototype.registerSelectorPseudos = function(name) {
    for (var j = 0, len = arguments.length; j < len; j++) {
      name = arguments[j];
      this.pseudos[name] = 'selector';
    }
    return this;
  };

  CssSelectorParser.prototype.unregisterSelectorPseudos = function(name) {
    for (var j = 0, len = arguments.length; j < len; j++) {
      name = arguments[j];
      delete this.pseudos[name];
    }
    return this;
  };

  CssSelectorParser.prototype.registerNumericPseudos = function(name) {
      for (var j = 0, len = arguments.length; j < len; j++) {
          name = arguments[j];
          this.pseudos[name] = 'numeric';
      }
      return this;
  };

  CssSelectorParser.prototype.unregisterNumericPseudos = function(name) {
      for (var j = 0, len = arguments.length; j < len; j++) {
          name = arguments[j];
          delete this.pseudos[name];
      }
      return this;
  };

  CssSelectorParser.prototype.registerNestingOperators = function(operator) {
    for (var j = 0, len = arguments.length; j < len; j++) {
      operator = arguments[j];
      this.ruleNestingOperators[operator] = true;
    }
    return this;
  };

  CssSelectorParser.prototype.unregisterNestingOperators = function(operator) {
    for (var j = 0, len = arguments.length; j < len; j++) {
      operator = arguments[j];
      delete this.ruleNestingOperators[operator];
    }
    return this;
  };

  CssSelectorParser.prototype.registerAttrEqualityMods = function(mod) {
    for (var j = 0, len = arguments.length; j < len; j++) {
      mod = arguments[j];
      this.attrEqualityMods[mod] = true;
    }
    return this;
  };

  CssSelectorParser.prototype.unregisterAttrEqualityMods = function(mod) {
    for (var j = 0, len = arguments.length; j < len; j++) {
      mod = arguments[j];
      delete this.attrEqualityMods[mod];
    }
    return this;
  };

  CssSelectorParser.prototype.enableSubstitutes = function() {
    this.substitutesEnabled = true;
    return this;
  };

  CssSelectorParser.prototype.disableSubstitutes = function() {
    this.substitutesEnabled = false;
    return this;
  };

  function isIdentStart(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c === '-') || (c === '_');
  }

  function isIdent(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '-' || c === '_';
  }

  function isHex(c) {
    return (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || (c >= '0' && c <= '9');
  }

  var identSpecialChars = {
    '!': true,
    '"': true,
    '#': true,
    '$': true,
    '%': true,
    '&': true,
    '\'': true,
    '(': true,
    ')': true,
    '*': true,
    '+': true,
    ',': true,
    '.': true,
    '/': true,
    ';': true,
    '<': true,
    '=': true,
    '>': true,
    '?': true,
    '@': true,
    '[': true,
    '\\': true,
    ']': true,
    '^': true,
    '`': true,
    '{': true,
    '|': true,
    '}': true,
    '~': true
  };

  var strReplacementsRev = {
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\f': '\\f',
    '\v': '\\v'
  };

  var singleQuoteEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\',
    '\'': '\''
  };

  var doubleQuotesEscapeChars = {
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    '\\': '\\',
    '"': '"'
  };

  function ParseContext(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
    var chr, getIdent, getStr, l, skipWhitespace;
    l = str.length;
    chr = null;
    getStr = function(quote, escapeTable) {
      var esc, hex, result;
      result = '';
      pos++;
      chr = str.charAt(pos);
      while (pos < l) {
        if (chr === quote) {
          pos++;
          return result;
        } else if (chr === '\\') {
          pos++;
          chr = str.charAt(pos);
          if (chr === quote) {
            result += quote;
          } else if (esc = escapeTable[chr]) {
            result += esc;
          } else if (isHex(chr)) {
            hex = chr;
            pos++;
            chr = str.charAt(pos);
            while (isHex(chr)) {
              hex += chr;
              pos++;
              chr = str.charAt(pos);
            }
            if (chr === ' ') {
              pos++;
              chr = str.charAt(pos);
            }
            result += String.fromCharCode(parseInt(hex, 16));
            continue;
          } else {
            result += chr;
          }
        } else {
          result += chr;
        }
        pos++;
        chr = str.charAt(pos);
      }
      return result;
    };
    getIdent = function() {
      var result = '';
      chr = str.charAt(pos);
      while (pos < l) {
        if (isIdent(chr)) {
          result += chr;
        } else if (chr === '\\') {
          pos++;
          if (pos >= l) {
            throw Error('Expected symbol but end of file reached.');
          }
          chr = str.charAt(pos);
          if (identSpecialChars[chr]) {
            result += chr;
          } else if (isHex(chr)) {
            var hex = chr;
            pos++;
            chr = str.charAt(pos);
            while (isHex(chr)) {
              hex += chr;
              pos++;
              chr = str.charAt(pos);
            }
            if (chr === ' ') {
              pos++;
              chr = str.charAt(pos);
            }
            result += String.fromCharCode(parseInt(hex, 16));
            continue;
          } else {
            result += chr;
          }
        } else {
          return result;
        }
        pos++;
        chr = str.charAt(pos);
      }
      return result;
    };
    skipWhitespace = function() {
      chr = str.charAt(pos);
      var result = false;
      while (chr === ' ' || chr === "\t" || chr === "\n" || chr === "\r" || chr === "\f") {
        result = true;
        pos++;
        chr = str.charAt(pos);
      }
      return result;
    };
    this.parse = function() {
      var res = this.parseSelector();
      if (pos < l) {
        throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
      }
      return res;
    };
    this.parseSelector = function() {
      var res;
      var selector = res = this.parseSingleSelector();
      chr = str.charAt(pos);
      while (chr === ',') {
        pos++;
        skipWhitespace();
        if (res.type !== 'selectors') {
          res = {
            type: 'selectors',
            selectors: [selector]
          };
        }
        selector = this.parseSingleSelector();
        if (!selector) {
          throw Error('Rule expected after ",".');
        }
        res.selectors.push(selector);
      }
      return res;
    };

    this.parseSingleSelector = function() {
      skipWhitespace();
      var selector = {
        type: 'ruleSet'
      };
      var rule = this.parseRule();
      if (!rule) {
        return null;
      }
      var currentRule = selector;
      while (rule) {
        rule.type = 'rule';
        currentRule.rule = rule;
        currentRule = rule;
        skipWhitespace();
        chr = str.charAt(pos);
        if (pos >= l || chr === ',' || chr === ')') {
          break;
        }
        if (ruleNestingOperators[chr]) {
          var op = chr;
          pos++;
          skipWhitespace();
          rule = this.parseRule();
          if (!rule) {
            throw Error('Rule expected after "' + op + '".');
          }
          rule.nestingOperator = op;
        } else {
          rule = this.parseRule();
          if (rule) {
            rule.nestingOperator = null;
          }
        }
      }
      return selector;
    };

    this.parseRule = function() {
      var rule = null;
      while (pos < l) {
        chr = str.charAt(pos);
        if (chr === '*') {
          pos++;
          (rule = rule || {}).tagName = '*';
        } else if (isIdentStart(chr) || chr === '\\') {
          (rule = rule || {}).tagName = getIdent();
        } else if (chr === '.') {
          pos++;
          rule = rule || {};
          (rule.classNames = rule.classNames || []).push(getIdent());
        } else if (chr === '#') {
          pos++;
          (rule = rule || {}).id = getIdent();
        } else if (chr === '[') {
          pos++;
          skipWhitespace();
          var attr = {
            name: getIdent()
          };
          skipWhitespace();
          if (chr === ']') {
            pos++;
          } else {
            var operator = '';
            if (attrEqualityMods[chr]) {
              operator = chr;
              pos++;
              chr = str.charAt(pos);
            }
            if (pos >= l) {
              throw Error('Expected "=" but end of file reached.');
            }
            if (chr !== '=') {
              throw Error('Expected "=" but "' + chr + '" found.');
            }
            attr.operator = operator + '=';
            pos++;
            skipWhitespace();
            var attrValue = '';
            attr.valueType = 'string';
            if (chr === '"') {
              attrValue = getStr('"', doubleQuotesEscapeChars);
            } else if (chr === '\'') {
              attrValue = getStr('\'', singleQuoteEscapeChars);
            } else if (substitutesEnabled && chr === '$') {
              pos++;
              attrValue = getIdent();
              attr.valueType = 'substitute';
            } else {
              while (pos < l) {
                if (chr === ']') {
                  break;
                }
                attrValue += chr;
                pos++;
                chr = str.charAt(pos);
              }
              attrValue = attrValue.trim();
            }
            skipWhitespace();
            if (pos >= l) {
              throw Error('Expected "]" but end of file reached.');
            }
            if (chr !== ']') {
              throw Error('Expected "]" but "' + chr + '" found.');
            }
            pos++;
            attr.value = attrValue;
          }
          rule = rule || {};
          (rule.attrs = rule.attrs || []).push(attr);
        } else if (chr === ':') {
          pos++;
          var pseudoName = getIdent();
          var pseudo = {
            name: pseudoName
          };
          if (chr === '(') {
            pos++;
            var value = '';
            skipWhitespace();
            if (pseudos[pseudoName] === 'selector') {
              pseudo.valueType = 'selector';
              value = this.parseSelector();
            } else {
              pseudo.valueType = pseudos[pseudoName] || 'string';
              if (chr === '"') {
                value = getStr('"', doubleQuotesEscapeChars);
              } else if (chr === '\'') {
                value = getStr('\'', singleQuoteEscapeChars);
              } else if (substitutesEnabled && chr === '$') {
                pos++;
                value = getIdent();
                pseudo.valueType = 'substitute';
              } else {
                while (pos < l) {
                  if (chr === ')') {
                    break;
                  }
                  value += chr;
                  pos++;
                  chr = str.charAt(pos);
                }
                value = value.trim();
              }
              skipWhitespace();
            }
            if (pos >= l) {
              throw Error('Expected ")" but end of file reached.');
            }
            if (chr !== ')') {
              throw Error('Expected ")" but "' + chr + '" found.');
            }
            pos++;
            pseudo.value = value;
          }
          rule = rule || {};
          (rule.pseudos = rule.pseudos || []).push(pseudo);
        } else {
          break;
        }
      }
      return rule;
    };
    return this;
  }

  CssSelectorParser.prototype.parse = function(str) {
    var context = new ParseContext(
        str,
        0,
        this.pseudos,
        this.attrEqualityMods,
        this.ruleNestingOperators,
        this.substitutesEnabled
    );
    return context.parse();
  };

  CssSelectorParser.prototype.escapeIdentifier = function(s) {
    var result = '';
    var i = 0;
    var len = s.length;
    while (i < len) {
      var chr = s.charAt(i);
      if (identSpecialChars[chr]) {
        result += '\\' + chr;
      } else {
        if (
            !(
                chr === '_' || chr === '-' ||
                (chr >= 'A' && chr <= 'Z') ||
                (chr >= 'a' && chr <= 'z') ||
                (i !== 0 && chr >= '0' && chr <= '9')
            )
        ) {
          var charCode = chr.charCodeAt(0);
          if ((charCode & 0xF800) === 0xD800) {
            var extraCharCode = s.charCodeAt(i++);
            if ((charCode & 0xFC00) !== 0xD800 || (extraCharCode & 0xFC00) !== 0xDC00) {
              throw Error('UCS-2(decode): illegal sequence');
            }
            charCode = ((charCode & 0x3FF) << 10) + (extraCharCode & 0x3FF) + 0x10000;
          }
          result += '\\' + charCode.toString(16) + ' ';
        } else {
          result += chr;
        }
      }
      i++;
    }
    return result;
  };

  CssSelectorParser.prototype.escapeStr = function(s) {
    var result = '';
    var i = 0;
    var len = s.length;
    var chr, replacement;
    while (i < len) {
      chr = s.charAt(i);
      if (chr === '"') {
        chr = '\\"';
      } else if (chr === '\\') {
        chr = '\\\\';
      } else if (replacement = strReplacementsRev[chr]) {
        chr = replacement;
      }
      result += chr;
      i++;
    }
    return "\"" + result + "\"";
  };

  CssSelectorParser.prototype.render = function(path) {
    return this._renderEntity(path).trim();
  };

  CssSelectorParser.prototype._renderEntity = function(entity) {
    var currentEntity, parts, res;
    res = '';
    switch (entity.type) {
      case 'ruleSet':
        currentEntity = entity.rule;
        parts = [];
        while (currentEntity) {
          if (currentEntity.nestingOperator) {
            parts.push(currentEntity.nestingOperator);
          }
          parts.push(this._renderEntity(currentEntity));
          currentEntity = currentEntity.rule;
        }
        res = parts.join(' ');
        break;
      case 'selectors':
        res = entity.selectors.map(this._renderEntity, this).join(', ');
        break;
      case 'rule':
        if (entity.tagName) {
          if (entity.tagName === '*') {
            res = '*';
          } else {
            res = this.escapeIdentifier(entity.tagName);
          }
        }
        if (entity.id) {
          res += "#" + this.escapeIdentifier(entity.id);
        }
        if (entity.classNames) {
          res += entity.classNames.map(function(cn) {
            return "." + (this.escapeIdentifier(cn));
          }, this).join('');
        }
        if (entity.attrs) {
          res += entity.attrs.map(function(attr) {
            if (attr.operator) {
              if (attr.valueType === 'substitute') {
                return "[" + this.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
              } else {
                return "[" + this.escapeIdentifier(attr.name) + attr.operator + this.escapeStr(attr.value) + "]";
              }
            } else {
              return "[" + this.escapeIdentifier(attr.name) + "]";
            }
          }, this).join('');
        }
        if (entity.pseudos) {
          res += entity.pseudos.map(function(pseudo) {
            if (pseudo.valueType) {
              if (pseudo.valueType === 'selector') {
                return ":" + this.escapeIdentifier(pseudo.name) + "(" + this._renderEntity(pseudo.value) + ")";
              } else if (pseudo.valueType === 'substitute') {
                return ":" + this.escapeIdentifier(pseudo.name) + "($" + pseudo.value + ")";
              } else if (pseudo.valueType === 'numeric') {
                return ":" + this.escapeIdentifier(pseudo.name) + "(" + pseudo.value + ")";
              } else {
                return ":" + this.escapeIdentifier(pseudo.name) + "(" + this.escapeIdentifier(pseudo.value) + ")";
              }
            } else {
              return ":" + this.escapeIdentifier(pseudo.name);
            }
          }, this).join('');
        }
        break;
      default:
        throw Error('Unknown entity type: "' + entity.type(+'".'));
    }
    return res;
  };

  var CssSelectorParser_1 = CssSelectorParser;

  var cssSelectorParser = {
  	CssSelectorParser: CssSelectorParser_1
  };

  var cssSelectorParser$1 = {
    CssSelectorParser: cssSelectorParser.CssSelectorParser
  };
  var cssSelectorParser_1 = cssSelectorParser$1.CssSelectorParser;

  const parser = new cssSelectorParser_1();

  parser.registerNestingOperators('>', '+', '~');
  parser.registerAttrEqualityMods('^', '$', '*', '~', '|');
  parser.enableSubstitutes();

  var parseSelector = selector => {
    try {
      const ast = parser.parse(selector);

      if (ast.type !== 'ruleSet') {
        throw new Error('Unsupported CSS selector')
      }

      return ast
    } catch (error) {
      throw new Error('Invalid CSS selector')
    }
  };

  var findSubject = ast => {
    let id = 0;
    let subject = ast.rule;

    subject.__id = id++;

    while (subject.rule && subject.rule.type === 'rule') {
      subject = subject.rule;
      subject.__id = id++;
    }

    return subject
  };

  var getParentNode = (ast, node) => {
    let current = ast;

    while (current.rule && current.__id !== node.__id - 1) {
      current = current.rule;
    }

    return current.__id === node.__id - 1 ? current : null
  };

  var getSelectors = selector => {
    const ast = parseSelector(selector);
    const subject = findSubject(ast);
    const selectors = [subject];
    let parent = null;

    while ((parent = getParentNode(ast, parent || subject))) {
      selectors.push(parent);
    }

    return selectors
  };

  var index = selector =>
    selector
      .split(/\s*,\s*/g)
      .map(selector => joinSelectors(getSelectors(selector)));

  return index;

}());
