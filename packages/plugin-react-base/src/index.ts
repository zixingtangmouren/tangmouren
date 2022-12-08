import { IPlugin } from 'build-scripts';
import { developConfig } from '@tang/build-config';

const reactBasePlugin: IPlugin = ({
  registerTask,
  onGetWebpackConfig,
  context,
}) => {
  // TODO: 解决导出是 default 的问题
  // @ts-ignore
  registerTask('react', developConfig.default);

  onGetWebpackConfig('react', (config) => {
    // TODO: babel-loader 的路径问题
    config.module
      .rule('babel')
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        options.presets.push([
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ]);
        return options;
      });
  });
};

export default reactBasePlugin;
