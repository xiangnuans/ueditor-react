# ueditor-react 使用说明

Github 地址：[ueditor-react](https://github.com/CoCoyh/ueditor-react)

# 工程结构

```
├── LICENSE
├── README.md
├── dist                    // 产物外链版本
├── esm                     // 产物ES6版本
├── examples                // 示例代码
├── lib                     // 产物ES5正常版本
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.js
├── src                     // 源代码
├── style                   // 源代码样式
└── webpack.config.js
```

# 使用说明

- 产出三种格式的代码：

  - `dist`: 外链版本，通过`script`标签引入
  - `esm`: es6 语法版本
  - `lib`: es5 语法常用版本

- style 独立放置

  - 可仅提供`.css`，也可以额外提供`.less`和`.scss`

- 命令

  - `npm run build`: 构建产物
  - `npm run start`: 本地启动，默认端口`8000`
    - `examples`中按照引用包的方式引用了`ueditor-react`组件，在`webpack.config.js`中按照如下配置
      ```
      resolve: {
        alias: {
          'ueditor-react: path.resolve(__dirname),
        },
      },
      ```
  - `npm run format`: 格式化
  - `npm run lint`: 代码校验，配置规则在`.eslintrc`中
  - `npm run test`: 运行测试用例
    - 测试用例语法参考：[Jest](https://facebook.github.io/jest/)

- 在`examples/dist`目录下启动服务

  - `serve`需要通过 npm 全局安装
    ```
        npm i -g serve
        serve -s examples/dist
    ```
