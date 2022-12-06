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

// TODO: 搞清楚如何按想要的顺序插入 loader
config.module.rule('css').before('css').use('css').loader('style-loader');

config.devServer.hot(true).open(true);

config.devtool('eval');

export default config;
