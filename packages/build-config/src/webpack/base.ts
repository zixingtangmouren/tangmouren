import Config = require('webpack-chain');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import ESLintWebpackPlugin = require('eslint-webpack-plugin');

const config = new Config();

config.resolve.extensions.add('.ts').add('.tsx').add('.js').add('.json');

config.module
  .rule('babel')
  .test(/\.(js|jsx|ts|tsx)$/)
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.26',
        },
      ],
      '@babel/preset-typescript',
    ],
  });

config.module
  .rule('css')
  .test(/\.css$/)
  .use('css')
  .loader('css-loader')
  .options({
    modules: {
      // 设置模块的模式
      mode(resourcePath: string) {
        // 如果全局目录下的 style 不进行类名模块化
        if (resourcePath.includes('/src/styles/')) {
          return 'global';
        }

        return 'local';
      },
      // local 模式的类名命名方式
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    },
  });

// TODO: 引入 scss less loader
// config.module
//   .rule('sass')
//   .test(/\.s[ca]ss$/)
//   .use('sass')
//   .loader('sass-loader');

config
  .plugin('HtmlWebpackPlugin')
  .use(HtmlWebpackPlugin)
  .use(ESLintWebpackPlugin);

export default config;
