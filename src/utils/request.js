import axios from "axios";
import { message } from "antd";

const timeout = 10000; //默认的超时时间
const baseOptions = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout,
  withCredentials: true,
};

const httpCode = {
  401: {
    status: 401,
    message: "未认证",
  },
  403: {
    status: 403,
    message: "暂时无权限访问",
  },
  500: {
    status: 500,
    message: "系统错误",
  },
};

const toLoginPage = () => {
  //跳转到登录页面
  try {
    window.top.location.href =
      "https://cas.leke.cn/login?service=" +
      encodeURIComponent(window.top.location.href);
  } catch (e) {
    window.top.location.href = "https://cas.leke.cn/login";
  }
};

axios.interceptors.request.use(
  function(config) {
    if (!window.navigator.onLine) {
      message.warning("网络已经断开，请检查网络状况");
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  //拦截器配置
  function(response) {
    const { code } = response.data;
    if (code == httpCode["401"].status) {
      toLoginPage();
    }
    if (code == httpCode["403"].status) {
      window.location.href = "https://static.leke.cn/pages/noAccess.html";
    }
    if (code == `${httpCode["500"].status}`) {
      //500的场景统一给出message
      message.error(response.data.message || "数据异常");
      return Promise.reject();
    }
    if (code == "200" && !response.data.success) {
      message.error(response.message || "操作失败");
      return Promise.reject();
    }
    return response;
  },
  function(error) {
    const { status, data } = error.response;
    message.error(data.message);
    if (status === httpCode["403"].status) {
      //无权限
      window.location.href = "https://static.leke.cn/pages/noAccess.html";
    }
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

export default class request {
  static get(url, params, config) {
    return axios({ ...baseOptions, url, params, ...config });
  }

  static post(url, data, config) {
    return axios({
      method: "post",
      ...baseOptions,
      ...config,
      url,
      data,
    });
  }
}
