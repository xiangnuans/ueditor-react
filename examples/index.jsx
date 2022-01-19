import React, { useEffect, useRef, useState } from "react";

import ReactDOM from "react-dom";
import UEditor from "./components/UEditor/index.jsx";

const App = () => {
  const [initData, setinitData] = useState("");
  const ueditorRef = useRef();

  const saveEditor = () => {
    console.log(ueditorRef.current.getUEContent());
    setinitData(ueditorRef.current.getUEContent());
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      saveEditor();
    }, 500);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div
      style={{ marginTop: "100px", marginLeft: "200px", marginRight: "200px" }}
    >
      <UEditor ref={ueditorRef} initData={initData} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
