import request from "./request";

const host = "https://webapp.leke.cn/auth/global";
/**
 * 上传图片
 * @param {*} data
 */
export const uploadImg = (data) => {
  return request
    .post(`${host}/fs/upload/image/binary.htm`, data)
    .then((res) => res.data);
};
