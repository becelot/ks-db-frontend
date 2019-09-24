import { decode } from 'html-encoder-decoder';
import { helper } from 'showdown';
import { getLanguage, highlight, highlightAuto } from 'highlight.js';


const  classAttr = 'class="';


export function replacement(wholeMatch, match, left, right) {
  match = decode(match);
  const lang = (left.match(/class=\"([^ \"]+)/) || [])[1];

  if (left.includes(classAttr)) {
    const attrIndex = left.indexOf(classAttr) + classAttr.length;
    left = left.slice(0, attrIndex) + 'hljs ' + left.slice(attrIndex);
  } else {
    left = left.slice(0, -1) + ' class="hljs">';
  }

  if (lang && getLanguage(lang)) {
    return left + highlight(lang, match).value + right;
  } else {
    return left + highlightAuto(match).value + right;
  }
}

export function filter(text, converter, options) {
  const left = '<pre><code\\b[^>]*>';
  const  right = '</code></pre>';
  const  flags = 'g';

  return helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
}

export const showdownHighlight = {
    type: 'output',
    filter
};
