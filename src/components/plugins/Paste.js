/**
 * 重写copy和paste
 * 支持复制从富文本框内复制图片到另一个富文本框
 * 粘贴图片或文本
 */
import { message } from "antd";
import { uploadImg } from "@utils/api";

export const registerPaste = (editor, width, serverUrl) => {
  const MAX_SIZE = 5 * 1024 * 1024;
  const imgWidth = width * (2 / 3);

  const getClipboardData = (e) => {
    let cbd = (e || e.originalEvent).clipboardData;
    if (cbd && cbd.items) {
      e.preventDefault();
      const list = Array.from(cbd.items);
      const imgItem = list.find(
        (o) =>
          o.kind == "file" &&
          (o.type === "image/png" ||
            o.type === "image/jpg" ||
            o.type === "image/jpeg")
      );
      const htmlItem = list.find(
        (o) => o.kind == "string" && o.type === "text/html"
      );
      if (imgItem) {
        const blob = imgItem.getAsFile();
        console.log("blob = ", blob);
        if (!blob) {
          message.error("请选择上传文件");
          return;
        }
        const formData = new FormData();

        // if(!/(.*)\.(jpg|jpeg|png|JPEG|PNG|JPEG)$/.test(data.name)) {
        //   message.error('仅支持JPG、JPEG、PNG等图片格式')
        //   return
        // }

        // 判断图片大小
        if (blob.size > MAX_SIZE) {
          message.error("图片大小不能超过5M");
          return;
        }
        formData.append("file", blob);
        formData.append("type", "image");
        if (!serverUrl) {
          message.warning("请配置图片上传服务器地址");
        }
        uploadImg(formData, serverUrl).then((res) => {
          if (res.success && res.datas && res.datas.url) {
            let w = res.datas.width;
            let h = res.datas.height;
            let hwRatio = h / w;
            let whRatio = w / h;
            if (res.datas.width > imgWidth) {
              w = imgWidth;
              h = hwRatio * w;
            } else if (h > pageHeight) {
              h = pageHeight;
              w = h * whRatio;
            }
            editor.execCommand("insertimage", {
              src: res.datas.url,
              width: w,
              height: h,
            });
          }
        });
      } else if (htmlItem) {
        htmlItem.getAsString((str) => {
          editor.execCommand("inserthtml", str);
        });
      } else {
        const strItem = list.find((o) => {
          o.kind === "string" && o.type === "text/plain";
        });
        if (strItem) {
          strItem.getAsString((str) => {
            editor.execCommand("insertText", false, str);
          });
        }
      }
    } else if (window.clipboardData) {
      if (!window.clipboardData.files || !window.clipboardData.files.length) {
        e.preventDefault();
        const txt = window.clipboardData.getData("text");
        const textNode = document.createTextNode(txt);
        const range = getRange();
        range.insertNode(textNode);
        setRange(range, textNode);
      }
    }
  };

  /**
   * URL转base64
   * @param url String 图片链接
   * @callback Function 获取base64格式后的回调函数
   */
  function getImgToBase64(url, callback) {
    let canvas = document.createElement("canvas"),
      context = canvas.getContext("2d"),
      img = new Image(); //通过构造函数绘制图片实例
    img.crossOrigin = "Anonymous"; //处理图片跨域问题，见拓展1
    img.onload = function() {
      //该加载过程为异步事件，请先确保获取完整图片
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0); //将图片绘制在canvas中
      var URLData = canvas.toDataURL("image/png");
      callback(URLData);
      canvas = null;
    };
    img.src = url;
  }

  /**
   * Base64 转换为二进制流
   * @param {*} base64
   * @param {*} contentType
   */
  const base64ToBlob = (base64, contentType) => {
    const arr = base64.split(","); //去掉base64格式图片的头部
    const bstr = atob(arr[1]); //atob()方法将数据解码
    let leng = bstr.length;
    let u8arr = new Uint8Array(leng);
    while (leng--) {
      u8arr[leng] = bstr.charCodeAt(leng); //返回指定位置的字符的 Unicode 编码
    }
    const blob = new Blob([u8arr], { type: contentType });
    // var blobImg = {}
    // blobImg.url = URL.createObjectURL(blob )  //创建URL,
    // blobImg.name = new Date().getTime() + '.png'
    return blob;
  };

  const copyElementToClipboard = (element) => {
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(
      typeof element === "string" ? document.getElementById(element) : element
    );
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  const clipboardHandler = (event) => {
    const target = event.target || event.srcElement;
    let type = target.nodeName;
    switch (type) {
      case "IMG":
        getImgToBase64(target.src, (data) => {
          // 只能是ClipboardItempng格式，但可以复制JPG
          const blob = base64ToBlob(data, "image/png");
          const item = new ClipboardItem({ "image/png": blob });
          if (navigator.clipboard) {
            navigator.clipboard.write([item]);
          }
        });
        break;
      default:
        copyElementToClipboard(target);
        break;
    }
  };

  editor.document.addEventListener("paste", (e) => {
    getClipboardData(e);
  });

  editor.document.addEventListener("copy", (e) => {
    clipboardHandler(e);
  });
};
