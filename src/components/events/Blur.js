/**
 * 失焦：内容自适应
 */
import { calContentHeight } from "@utils/common";
export const blur = (ueditor, editorList, id, type) => {
  ueditor.addListener("blur", () => {
    const con = calContentHeight(ueditor, type);
    let contentHeight = con.contentHeight;

    // 图片灰色蒙层
    const range = ueditor.selection.getRange();
    const img = range.getClosedNode();
    if (img && img.tagName === "IMG") {
      range.setCursor(true);
    }

    const newList = [...editorList];
    const editorsItem = newList.find(item => item.id == Number(id));
    // 非跨页富文本失焦内容自适应
    if (editorsItem && editorsItem.height < contentHeight) {
      editorsItem.html = ueditor.getContent();
      editorsItem.height = contentHeight;
      ueditor.setHeight(contentHeight);
    }
  });
};
