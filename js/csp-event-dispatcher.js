(function () {
  'use strict';

  function splitTopLevel(value, separator) {
    var parts = [];
    var current = '';
    var quote = '';
    var depth = 0;
    for (var i = 0; i < value.length; i += 1) {
      var ch = value.charAt(i);
      var prev = value.charAt(i - 1);
      if (quote) {
        current += ch;
        if (ch === quote && prev !== '\\') quote = '';
        continue;
      }
      if (ch === '\'' || ch === '"') { quote = ch; current += ch; continue; }
      if (ch === '(') depth += 1;
      if (ch === ')') depth -= 1;
      if (ch === separator && depth === 0) {
        if (current.trim()) parts.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
  }

  function parseArgs(argText, element, event) {
    if (!argText.trim()) return [];
    return splitTopLevel(argText, ',').map(function (arg) {
      var text = arg.trim();
      if (text === 'this') return element;
      if (text === 'event') return event;
      if (text === 'true') return true;
      if (text === 'false') return false;
      if (text === 'null') return null;
      if (/^-?\d+(?:\.\d+)?$/.test(text)) return Number(text);
      var quoted = text.match(/^(['"])([\s\S]*)\1$/);
      if (quoted) return quoted[2].replace(/\\(['"])/g, '$1');
      return text;
    });
  }

  function resolveGlobal(name) {
    return name.split('.').reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, window);
  }

  function sanitizeHtml(html) {
    if (typeof html !== 'string' || html.indexOf('<') === -1) return html;
    return html
      .replace(/<script\b([^>]*)>\s*<\/script>/gi, function (_match, attrs) {
        var src = attrs.match(/\ssrc\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
        var scriptSrc = src ? (src[2] || src[3] || src[4] || '') : '';
        return scriptSrc ? '<span data-csp-script-src="' + encodeAttr(scriptSrc) + '"></span>' : '';
      })
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<([A-Za-z][^<>]*?)>/g, function (tag) {
      return tag
        .replace(/\sstyle\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi, function (_match, _raw, doubleValue, singleValue, bareValue) {
          var styleText = doubleValue || singleValue || bareValue || '';
          return styleText ? ' data-csp-style="' + encodeAttr(styleText) + '"' : '';
        })
        .replace(/\son([a-z]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi, function (_match, eventName, _raw, doubleValue, singleValue, bareValue) {
          var code = doubleValue || singleValue || bareValue || '';
          return code ? ' data-csp-on' + eventName.toLowerCase() + '="' + encodeAttr(code) + '"' : '';
        });
      });
  }

  function encodeAttr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function decodeAttr(value) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
  }

  function makeClassName(styleText) {
    var hash = 5381;
    for (var i = 0; i < styleText.length; i += 1) {
      hash = ((hash << 5) + hash) + styleText.charCodeAt(i);
      hash &= 0xffffffff;
    }
    return 'csp-dynamic-style-' + (hash >>> 0).toString(36);
  }

  function importantStyle(styleText) {
    return styleText.split(';').map(function (part) {
      var declaration = part.trim();
      if (!declaration) return '';
      if (/^display\s*:/i.test(declaration)) return declaration + ';';
      return /!important\s*$/i.test(declaration) ? declaration + ';' : declaration + ' !important;';
    }).filter(Boolean).join(' ');
  }

  function getWritableStyleSheet() {
    for (var i = 0; i < document.styleSheets.length; i += 1) {
      var sheet = document.styleSheets[i];
      var href = sheet.href || '';
      if (href.indexOf('/css/csp-inline-styles.css') !== -1 || href.indexOf('\\css\\csp-inline-styles.css') !== -1) {
        try {
          sheet.cssRules;
          return sheet;
        } catch (_err) {
          return null;
        }
      }
    }
    return null;
  }

  function applyCspStyles(root) {
    var nodes = [];
    if (root && root.nodeType === 1 && root.hasAttribute('data-csp-style')) nodes.push(root);
    if (root && root.querySelectorAll) {
      nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll('[data-csp-style]')));
    }
    var sheet = getWritableStyleSheet();
    nodes.forEach(function (node) {
      var styleText = decodeAttr(node.getAttribute('data-csp-style') || '');
      if (styleText && sheet) {
        var className = makeClassName(styleText);
        if (!node.classList.contains(className)) node.classList.add(className);
        if (!sheet.ownerNode || !sheet.ownerNode.__cspDynamicRules) {
          if (sheet.ownerNode) sheet.ownerNode.__cspDynamicRules = {};
        }
        var ruleMap = sheet.ownerNode ? sheet.ownerNode.__cspDynamicRules : null;
        if (!ruleMap || !ruleMap[className]) {
          sheet.insertRule('.' + className + ' { ' + importantStyle(styleText) + ' }', sheet.cssRules.length);
          if (ruleMap) ruleMap[className] = true;
        }
      }
      node.removeAttribute('data-csp-style');
    });
  }

  function loadCspScripts(root) {
    var nodes = [];
    if (root && root.nodeType === 1 && root.hasAttribute('data-csp-script-src')) nodes.push(root);
    if (root && root.querySelectorAll) {
      nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll('[data-csp-script-src]')));
    }
    var loads = nodes.map(function (node) {
      var src = decodeAttr(node.getAttribute('data-csp-script-src') || '');
      node.removeAttribute('data-csp-script-src');
      node.parentNode && node.parentNode.removeChild(node);
      if (!src) return Promise.resolve();
      var script = document.createElement('script');
      script.async = false;
      script.src = src;
      var load = new Promise(function (resolve) {
        script.onload = resolve;
        script.onerror = resolve;
      });
      document.body.appendChild(script);
      return load;
    });
    return Promise.all(loads);
  }

  function patchJQuery() {
    if (!window.jQuery || window.jQuery.__cspPatched) return;
    var $ = window.jQuery;
    var originalHtml = $.fn.html;
    ['append', 'prepend', 'before', 'after', 'html'].forEach(function (methodName) {
      var original = $.fn[methodName];
      if (typeof original !== 'function') return;
      $.fn[methodName] = function () {
        for (var i = 0; i < arguments.length; i += 1) {
          arguments[i] = sanitizeHtml(arguments[i]);
        }
        var result = original.apply(this, arguments);
        applyCspStyles(document);
        loadCspScripts(document);
        return result;
      };
    });
    var originalLoad = $.fn.load;
    if (typeof originalLoad === 'function') {
      $.fn.load = function (url, params, callback) {
        if (typeof url !== 'string') {
          return originalLoad.apply(this, arguments);
        }

        var selector;
        var selectorOffset = url.indexOf(' ');
        if (selectorOffset > -1) {
          selector = url.slice(selectorOffset).trim();
          url = url.slice(0, selectorOffset);
        }

        if (typeof params === 'function') {
          callback = params;
          params = undefined;
        }

        var targets = this;
        if (!targets.length) return targets;

        $.ajax({
          url: url,
          type: params && typeof params === 'object' ? 'POST' : 'GET',
          data: params
        }).done(function (responseText, textStatus, jqXHR) {
          var html = sanitizeHtml(responseText);
          if (selector) {
            html = $('<div>').append($.parseHTML(html, document, true)).find(selector);
          }

          var waits = [];
          targets.each(function () {
            originalHtml.call($(this), html);
            applyCspStyles(this);
            waits.push(loadCspScripts(this));
          });

          Promise.all(waits).then(function () {
            if (callback) {
              targets.each(function () {
                callback.apply(this, [responseText, textStatus, jqXHR]);
              });
            }
          });
        }).fail(function (jqXHR, textStatus) {
          if (callback) {
            targets.each(function () {
              callback.apply(this, [jqXHR.responseText || '', textStatus, jqXHR]);
            });
          }
        });

        return targets;
      };
    }
    var originalParseHTML = $.parseHTML;
    if (typeof originalParseHTML === 'function') {
      $.parseHTML = function (data) {
        arguments[0] = sanitizeHtml(data);
        return originalParseHTML.apply(this, arguments);
      };
    }
    ['click', 'change', 'input', 'submit'].forEach(function (eventName) {
      $(document).off(eventName + '.cspSyntheticEventBridge').on(eventName + '.cspSyntheticEventBridge', '[data-csp-on' + eventName + ']', function (event) {
        if (event.originalEvent) return;
        runAction(this, eventName, event);
      });
    });
    $.__cspPatched = true;
  }

  function runStatement(statement, element, event) {
    var text = statement.trim().replace(/^return\s+/, '').replace(/;$/, '');
    if (!text) return;

    var jq = text.match(/^\$\((['"])([\s\S]*?)\1\)\.([A-Za-z_$][\w$]*)\((.*)\)$/);
    if (jq) {
      var target = window.jQuery ? window.jQuery(jq[2]) : null;
      var method = target && target[jq[3]];
      if (typeof method === 'function') {
        method.apply(target, parseArgs(jq[4], element, event));
      }
      return;
    }

    var fnCall = text.match(/^([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\((.*)\)$/);
    if (fnCall) {
      var fn = resolveGlobal(fnCall[1]);
      if (typeof fn === 'function') {
        fn.apply(element, parseArgs(fnCall[2], element, event));
      }
    }
  }

  function runAction(element, eventName, event) {
    var code = element.getAttribute('data-csp-on' + eventName);
    if (!code) return;
    if (eventName === 'click' && element.tagName === 'A' && element.getAttribute('href') === '#') {
      event.preventDefault();
    }
    splitTopLevel(code, ';').forEach(function (statement) {
      runStatement(statement, element, event);
    });
  }

  ['click', 'change', 'input', 'submit'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      var target = event.target.closest('[data-csp-on' + eventName + ']');
      if (target) runAction(target, eventName, event);
    }, true);
  });

  document.addEventListener('DOMContentLoaded', function () {
    patchJQuery();
    applyCspStyles(document);
    loadCspScripts(document);
    if (window.MutationObserver) {
      new MutationObserver(function (records) {
        records.forEach(function (record) {
          Array.prototype.forEach.call(record.addedNodes, function (node) {
            applyCspStyles(node);
            loadCspScripts(node);
          });
        });
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  });

  if (window.jQuery) patchJQuery();
})();
