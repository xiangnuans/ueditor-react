/**
 * 百富富文本配置
 */
export const editorConfig = (width, height) => {
  return {
    // serverUrl: uploadImg, // 服务器统一请求接口路径
    toolbars: [
      [
        "fontsize", // 字号
        "undo", // 撤销
        "redo", // 重做
        "bold", // 加粗
        "italic", // 斜体
        "underline", // 下划线
        "lineheight", // 行间距
        "subscript", // 下标
        "superscript", // 上标
        "removeformat", // 清除格式
        "justifyleft", // 居左对齐
        "justifyright", // 居右对齐
        "justifycenter", // 居中对齐
        "diyimg", // 单图上传
        "borderbtm",
      ],
    ],
    initialStyle:
      "p{line-height:23px!important;padding:0px!important;margin:10px 10px 0px 10px !important;font-size:14px!important}p::after{color:transparent}",
    enableAutoSave: false,
    autoSyncData: false,
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    initialFrameHeight: height,
    initialFrameWidth: width,
    wordCount: false,
    enableContextMenu: false,
    pasteImageEnabled: true,
    dropFileEnabled: true,
    catchRemoteImageEnable: true,
    // maximumWords: 1000
    imageScaleEnabled: false,
    // scaleEnabled: false
  };
};
