# tangmouren 工程框架

## 目标

- 工程打包脚本实现
- 完成基础的 webpack 配置能力 (babel,loader,plugin, postcss)
- 完成基础的 react 模板创建、调试、打包能力

## build-config

1. 通用的 webpack 配置
2. 相关 loader

## tang-cli

1. 对接 build-scripts ，完善 start/build 指令
2. 相关模板创建指令 create（react/vue）

## plugin-pwa

pwa 相关工程

## plugin-ssr

服务端渲染相关工程

## plugin-mpa

多页应用相关工程

## 问题记录

- 如果需要 Eslint 正确验证 TS 需要在 parserOptions.project 中配置

```json
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.base.json"],
  },
```
