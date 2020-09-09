/**
 * 上传图片
 * @param {*} data
 */
export const uploadImg = (data, url) => {
  return request.post(`${url}`, data).then((res) => res.data);
};
