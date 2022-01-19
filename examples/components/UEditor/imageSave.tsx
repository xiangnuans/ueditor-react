import { message } from "antd";

const MAX_SIZE = 5 * 1024 * 1024 // 图片最大限制

export const requestUploadImg = (blob: any, width: number, pageHeight: number) => {

  let imgWidth: number;
  if (width) {
    imgWidth = width * (2 / 3);
  }
  if (!blob) {
    message.error("请选择上传文件");
    return;
  }

  const formData = new FormData();
  if (!/(.*)\.(jpg|jpeg|png|JPEG|PNG|JPEG)$/.test(blob.name)) {
    message.error("仅支持JPG、JPEG、PNG等图片格式");
    return;
  }
  if (blob.size > MAX_SIZE) {
    message.error("图片大小不能超过5M");
    return;
  }
  formData.append("file", blob);
  formData.append("type", "image");
  // return API.uploadImg(formData).then((res) => {
  //   if (res.success && res.datas && res.datas.url) {
  //     let w = res.datas.width;
  //     let h = res.datas.height;
  //     const hwRatio = h / w;
  //     const whRatio = w / h;
  //     if (imgWidth && res.datas.width > imgWidth) {
  //       w = imgWidth;
  //       h = hwRatio * w;
  //     } else if (h > pageHeight) {
  //       h = pageHeight;
  //       w = h * whRatio;
  //     }
  //     return { ...res, w, h };
  //   }
  // });
};
