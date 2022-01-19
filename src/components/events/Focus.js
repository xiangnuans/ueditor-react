/**
 * 监听focus事件
 * @param {*} ueditor
 */
export const focus = ueditor => {
  ueditor.addListener("focus", () => {
    ueditor.iframe.contentDocument.body.innerHTML.replace(/.*<\/p>​$/, "</p>");
  });
};
