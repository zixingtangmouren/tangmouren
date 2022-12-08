import config from './base';
import * as path from 'path';

config.mode('development');

config
  .entry('index')
  .add('src/index')
  .end()
  .output.filename('bundle.js')
  .path(path.resolve(process.cwd(), 'dist'))
  .set('clean', true);

config.module.rule('css').use('style').loader('style-loader').before('css');
config.module.rule('sass').use('style').loader('style-loader').before('css');
config.module.rule('less').use('style').loader('style-loader').before('css');

// config.module
//   .rule('css')
//   .use('MiniCssExtractPlugin')
//   .loader(MiniCssExtractPlugin.loader)
//   .before('css');
// config.module
//   .rule('sass')
//   .use('MiniCssExtractPlugin')
//   .loader(MiniCssExtractPlugin.loader)
//   .before('css');
// config.module
//   .rule('less')
//   .use('MiniCssExtractPlugin')
//   .loader(MiniCssExtractPlugin.loader)
//   .before('css');

config.devtool('eval');

export default config;
