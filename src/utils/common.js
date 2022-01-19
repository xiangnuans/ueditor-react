/**
 * 计算富文本框中的高度以及行数
 * @param {*} editor
 * @param {*} type
 */
export const calContentHeight = (editor, type) => {
  let children = editor.document.documentElement.children[1].childNodes;
  let contentHeight = 0;
  let line = children.length;
  for (var i = 0; i < line; i++) {
    contentHeight += children[i].clientHeight;
  }
  return {
    contentHeight,
    line
  };
};

/**
 * 将字符串正则匹配<p>的个数，
 * @param {string} html
 * @returns {Array}
 */
export const getHtmlToArray = html => {
  return html.split("</p>");
};

export const getLineToHtml = (htmlArray, start, end) => {
  return htmlArray
    .slice(start, end)
    .reduce((accumulator, currentValue) =>
      `${accumulator}</p>`.concat(`${currentValue}</p>`)
    );
};
