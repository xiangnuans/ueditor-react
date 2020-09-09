/**
 * @module 百度富文本编辑器
 */
import React, { Component } from "react";

import { registerImg } from "../UploadImage/index";
import { registerPaste } from "../Paste/index";

let a = [];

export default class Ueditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ueditor: {},
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

  handleContent = (params) => {
    const { type, content } = params;
    const { ueditor } = this.state;
    ueditor.setContent(`${content}`, false);
    ueditor.body.style.overflowX = "hidden";
    ueditor.body.style.paddingRight = "4mm";
    ueditor.body.style.fontSize = "12px";
    if (type === "title") {
      ueditor.body.style.marginLeft = "-4mm";
      // ueditor.body.p.style.lineHeight = 'inherit';
    }
    if (type === "answer" || type === "blank") {
      ueditor.body.style.paddingTop = "2mm";
    }
  };

  readyContent = (prop) => {
    const { resetList, id, type, width, url } = this.props;
    const { ueditor } = this.state;
    this.handleContent(prop);
    registerPaste(ueditor, width, url);
    ueditor.addListener("focus", (e) => {
      ueditor.iframe.contentDocument.body.innerHTML.replace(
        /.*<\/p>​$/,
        "</p>"
      );
    });
    ueditor.addListener("blur", (e) => {
      const con = calContentHeight(ueditor, type);
      let contentHeight = con.contentHeight;

      // 图片灰色蒙层
      // const range = ueditor.selection.getRange()
      // const img = range.getClosedNode();
      // if (img && img.tagName === "IMG") {
      //   range.setCursor(true);
      // }

      const newList = [...this.props.editorList];
      let curId = id;
      if (/^(\d+\.)/.test(id)) {
        curId = id.split(".")[0];
      }
      const editorsItem = newList.find((item) => item.id == Number(curId));
      editorsItem.data = { ...editorsItem.data, answerLine: 0 };
      // 非跨页富文本失焦内容自适应
      if (editorsItem) {
        if (/^(\d+\.)/.test(id)) {
          // 跨页富文本内容保存到editorList
          const { upContent, nextContent, upHeight, nextHeight } = spreadPage(
            editorsItem,
            id,
            type
          );
          editorsItem.html = `${upContent}${nextContent}`;
          editorsItem.height = upHeight + nextHeight;
          resetList(newList);
          if (/^(\d+\.1)/.test(id)) {
            ueditor.setHeight(upHeight);
          }
          if (/^(\d+\.2)/.test(id)) {
            ueditor.setHeight(nextHeight);
          }
        } else {
          if (editorsItem.height < contentHeight) {
            editorsItem.html = window.UE.getEditor(`${id}`).getContent();
            editorsItem.height = contentHeight;
            if (type === "answer") {
              editorsItem.answerLine = con.line;
            }
            resetList(newList);
            ueditor.setHeight(contentHeight);
          }
        }
      }
    });
    // 换行符
    // this.replaceBr();
  };

  // 初始化编辑器
  init(proType) {
    const { height, width, id, url } = this.props;
    const h = height || 400;
    const w = width || 800;
    let editorId = id || "editor";
    const UE = window.UE;
    registerImg(UE, width, url);
    if (proType === "update") {
      UE.delEditor(id);
      this.init("add");
    }
    const editor = window.UE.getEditor(`${editorId}`, {
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
      initialFrameHeight: h,
      initialFrameWidth: w,
      wordCount: false,
      enableContextMenu: false,
      catchRemoteImage: false,
      pasteImageEnabled: false,
      scaleEnabled: false,
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
          // if (nextProp.isReset) {
          //   this.props.handleReset(this.props.type, this.props.id);
          // }
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
    return <div id="editor" type="text/plain" />;
  }
}
