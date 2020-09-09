/**
 * @module 百度富文本编辑器
 */
import React, { Component } from "react";

import { registerImg } from "../UploadImage/index";

let editor = null;
const width = 1200;

export default class Block extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    registerImg(window.UE, width);
    this.setConfig();
  }

  componentWillUnmount() {
    editor.destroy();
  }

  // 初始化编辑器
  setConfig() {
    editor = window.UE.getEditor("editor", {
      toolbars: [
        [
          // 'formatmatch', // 格式刷
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
          // 'spechars',  // 特殊字符
          "diyimg", // 单图上传
          // 'inserttable', // 插入表格
          "borderbtm",
        ],
      ],
      enableAutoSave: false,
      autoSyncFata: false,
      autoHeightEnabled: false,
      autoFloatEnabled: false,
      initialFrameHeight: 450,
      initialFrameWidth: 1200,
      wordCount: false,
      enableContextMenu: false,
      catchRemoteImage: false,
      pasteImageEnabled: false,
      scaleEnabled: true,
    });
    editor.ready(() => {
      editor.setContent(this.props.initData);
    });
  }

  // 获取编辑器内容
  getUEContent() {
    return editor.getContent();
  }

  render() {
    return <div id="editor" style={{ marginTop: 50 }} type="text/plain" />;
  }
}
