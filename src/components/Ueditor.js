/**
 * @module 百度富文本编辑器
 */
import React, { Component } from "react";

import { addSolid } from "./plugins/AddSolid";
import { blur } from "./events/Blur";
import { changeSolid } from "./plugins/ChangeSolid";
import { focus } from "./events/focus";
import { registerImg } from "./plugins/UploadImage";
import { registerPaste } from "./plugins/Paste";
import { toggleHeavy } from "./plugins/ToggleHeavy";

let a = [];

export default class Ueditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ueditor: {},
      id: this.props.id || "editor",
      width: this.props.width || 800,
      height: this.props.height || 400
    };
  }

  componentDidMount() {
    if (a.indexOf(this.props.id) === -1) {
      a.push(this.props.id);
      this.init("add");
    } else {
      this.init("update");
    }
  }

  handleContent = params => {
    const { content } = params;
    const { ueditor } = this.state;
    ueditor.setContent(`${content}`, false);
    ueditor.body.style.overflowX = "hidden";
    ueditor.body.style.fontSize = "12px";
  };

  readyContent = prop => {
    const { id, width, url } = this.props;
    const { ueditor } = this.state;
    this.handleContent(prop);
    registerPaste(ueditor, width, url);
    focus(ueditor);
    blur(ueditor, this.props.editorList, id);
  };

  // 初始化编辑器
  init(proType) {
    const { url } = this.props;
    const { id, width, height } = this.state;
    const UE = window.UE;
    registerImg(UE, width, url);
    addSolid(UE);
    changeSolid(UE);
    toggleHeavy(UE);
    if (proType === "update") {
      UE.delEditor(id);
      this.init("add");
    }
    const editor = UE.getEditor(`${id}`, {
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
          "borderbtm"
        ]
      ],
      enableAutoSave: false,
      autoSyncFata: false,
      autoHeightEnabled: false,
      autoFloatEnabled: false,
      initialFrameHeight: height,
      initialFrameWidth: width,
      wordCount: false,
      enableContextMenu: false,
      catchRemoteImage: false,
      pasteImageEnabled: false,
      scaleEnabled: false
    });
    editor.ready(() => {
      this.setState({ ueditor: editor });
      this.readyContent(this.props);
    });
  }

  UNSAFE_componentWillUpdate(nextProp) {
    const { ueditor } = this.state;
    if (!nextProp) {
      return;
    }
    if (
      (this.props.content &&
        nextProp.content &&
        this.props.content !== nextProp.content) ||
      this.props.content === nextProp.content
    ) {
      const timerId = setInterval(() => {
        let count = 0;
        count++;
        if (ueditor.ready) {
          this.readyContent(nextProp);
          clearInterval(timerId);
        }
        if (count >= 16) {
          clearInterval(timerId);
        }
      }, 380);
    }

    if (
      this.props.height &&
      nextProp.height &&
      this.props.height !== nextProp.height
    ) {
      ueditor.setHeight(nextProp.height);
    }
  }
  render() {
    return <div id={`${this.state.id}`} type="text/plain" />;
  }
}
