import { message } from "antd";
import { uploadImg } from "../../utils/api";

export const registerImg = (UE, width) => {
  const MAX_SIZE = 5 * 1024 * 1024;
  const imgWidth = width * (2 / 3);
  UE.ui["diyimg"] = function(editor) {
    const ui = new UE.ui.Button({
      className: "edui-for-simpleupload",
      title:
        editor.options.labelMap["simpleupload"] ||
        editor.getLang("labelMap.simpleupload") ||
        "",
      theme: editor.options.theme,
      onclick: function() {
        let fileInput = document.createElement("input");
        fileInput.id = "ueditor-custom-upload";
        fileInput.type = "file";
        fileInput.style.display = "none";
        fileInput.click();
        fileInput.addEventListener("change", function(e) {
          const formData = new FormData();
          const data = e.target.files[0];
          if (!data) {
            message.error("请选择上传文件");
            return;
          }
          if (!/(.*)\.(jpg|jpeg|png|JPEG|PNG|JPEG)$/.test(data.name)) {
            message.error("仅支持JPG、JPEG、PNG等图片格式");
            return;
          }
          // 判断图片大小
          if (data.size > MAX_SIZE) {
            message.error("图片大小不能超过5M");
            return;
          }
          formData.append("file", data);
          formData.append("type", "image");
          uploadImg(formData).then((res) => {
            if (res.success && res.datas && res.datas.url) {
              let w = res.datas.width;
              if (res.datas.width > imgWidth) {
                w = imgWidth;
              }
              editor.execCommand("insertimage", {
                src: res.datas.url,
                width: w,
              });
            }
          });
        });
      },
    });
    UE.ui.buttons.diyimg = ui;
    return ui;
  };
};
