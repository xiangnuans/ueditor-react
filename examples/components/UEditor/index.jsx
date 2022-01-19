/**
 * @module 百度富文本编辑器
 * 自定义菜单配置
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from "react";

import { editorConfig } from "./config";
import { loadFiles } from "./import";

const UEditor = (props, ref) => {
  const [editor, seteditor] = useState(null);
  useImperativeHandle(ref, () => ({
    getUEContent
  }));

  useEffect(() => {
    loadFiles().then(() => {
      setConfig();
    });
    return () => {
      editor.destroy();
    };
  }, []);

  // 初始化编辑器
  const setConfig = () => {
    const UE = window.UE;
    const { initData } = props;
    const ueditor = UE.getEditor("editor", editorConfig(null, 300));
    seteditor(ueditor);
    ueditor.ready(() => {
      ueditor.setContent(initData);
    });
  };

  // 获取编辑器内容
  const getUEContent = () => {
    return (editor && editor.getContent()) || editor?.body?.innerHTML;
  };

  return <div id="editor" type="text/plain" />;
};

export default forwardRef(UEditor);
