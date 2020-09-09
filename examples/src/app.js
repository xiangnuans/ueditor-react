import React, { Component } from "react";

import { Button } from "antd";
import ReactDOM from "react-dom";
import UEditor from "../../src/components/Ueditor/index";

class App extends Component {
  constructor() {
    super();
    this.state = {
      initData: "",
    };
  }

  // 富文本编辑器 保存
  saveEditor = () => {
    console.log(this.refs.ueditor.getUEContent());
  };
  render() {
    return (
      <div>
        {/* 使用UEditor 组件 */}
        <UEditor ref="ueditor" initData={this.state.initData} />
        <Button type="primary" onClick={this.saveEditor}>
          保存
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
