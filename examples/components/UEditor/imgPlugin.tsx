// @ts-nocheck
import { requestUploadImg } from "./imageSave";

/**
 * 富文本框上传图片插件
 * @param UE 
 * @param width 
 * @param pageHeight 
 */
export const imgPlugin = (UE, width, pageHeight) => {
  UE.ui["diyimg"] = function (editor) {
    const ui = new UE.ui.Button({
      className: "edui-for-simpleupload",
      title:
        editor.options.labelMap["simpleupload"] ||
        editor.getLang("labelMap.simpleupload") ||
        "",
      theme: editor.options.theme,
      onclick: function () {
        const fileInput = document.createElement("input");
        fileInput.id = "ueditor-custom-upload";
        fileInput.type = "file";
        fileInput.style.display = "none";
        fileInput.click();
        fileInput.addEventListener("change", function (e) {
          const data = e.target.files[0];
          requestUploadImg(data, width, pageHeight).then((res) => {
            editor.execCommand("insertimage", {
              src: res.datas.url,
              width: res.w,
              height: res.h,
            });
            //触发编辑器失焦事件
            document.getElementById("focusInput").focus();
            document.getElementById("focusInput").blur();
          })
        });
      },
    });
    UE.ui.buttons.diyimg = ui;
    return ui;
  };
};
