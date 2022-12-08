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

config.module
  .rule('sass')
  .test(/\.s[ca]ss$/)
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
  })
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: 750, // 设计稿的宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [], // 不需要转换的
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: undefined,
        include: undefined,
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 1460,
      },
    },
  })
  .end()
  .use('sass')
  .loader('sass-loader');

config.module
  .rule('less')
  .test(/\.less$/)
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
  })
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: 750, // 设计稿的宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [], // 不需要转换的
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: undefined,
        include: undefined,
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 1460,
      },
    },
  })
  .end()
  .use('less')
  .loader('less-loader');

config
  .plugin('HtmlWebpackPlugin')
  .use(HtmlWebpackPlugin)
  // TODO: eslint 非必须
  .use(ESLintWebpackPlugin);

export default config;
