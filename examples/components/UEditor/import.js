const files = [
  "examples/lib/js/jquery.min.js",
  "examples/lib/js/jquery.validate.min.js",
  "examples/lib/js/bootstrap.min.js",
  "examples/lib/js/snap.svg-min.js",
  "examples/lib/js/jquery-ui.js",
  "examples/lib/ueditor/ueditor.config.js",
  "examples/lib/ueditor/ueditor.all.js",
  "examples/lib/ueditor/lang/zh-cn/zh-cn.js",
];
const styles = [
  "examples/lib/js/bootstrap.min.css",
  "examples/lib/js/jquery-ui.css",
];
const linkLoaded = {};
const scriptLoaded = {};

export const loadFiles = async () => {
  for (let index = 0; index < styles.length; index++) {
    const element = styles[index];
    await loadStyle(`load_${index}`, element);
  }
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    await loadJS(`load_${index}`, element);
  }
};

function loadStyle(code, url) {
  return new Promise(function(resolve, reject) {
    if (typeof linkLoaded[code] === "undefined") {
      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      link.onload = function() {
        linkLoaded[code] = true;
        resolve({ code });
      };
      link.onerror = function(error) {
        reject(error);
      };
    } else {
      resolve({ code });
    }
  });
}

function loadJS(code, url) {
  return new Promise(function(resolve, reject) {
    if (typeof scriptLoaded[code] === "undefined") {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);

      script.onload = function() {
        scriptLoaded[code] = true;
        resolve({ code });
      };
      script.onerror = function(error) {
        reject(error);
      };
    } else {
      resolve({ code });
    }
  });
}
