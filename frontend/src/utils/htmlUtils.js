import DOMPurify from 'dompurify';

const opts = {
  ALLOWED_TAGS: ['b', 'em', 'strong', 'div', 'p', 'br', 'i', 'u', 'li', 'ol', 'ul', 'a'],
  ALLOWED_ATTR: [],
};

export const exportHtml = (html) => {
  //https://github.com/megahertz/react-simple-wysiwyg/issues/47 says process the HTML to replace DIV with P tags
  let str = DOMPurify.sanitize(html, opts)
    .replaceAll('<div', '<p')
    .replaceAll('</div', '</p');
  if (!str.startsWith('<p>')) {
    str = '<p>' + str.replace('<p>', '</p><p>');
  }
  return DOMPurify.sanitize(str, opts);
};