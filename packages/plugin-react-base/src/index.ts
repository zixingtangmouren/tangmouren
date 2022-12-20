import { IPlugin } from 'build-scripts';
import { developConfig } from '@tang/build-config';
import path = require('path');
import * as fs from 'fs';

const reactBasePlugin: IPlugin = ({
  registerTask,
  onGetWebpackConfig,
  registerUserConfig,
  context,
}) => {
  const { originalUserConfig } = context;

  registerTask('react', developConfig);

  registerUserConfig({
    name: 'templatePath',
    defaultValue: './public/index.html',
  });

  onGetWebpackConfig('react', (config) => {
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

    if (originalUserConfig.templatePath) {
      config.plugin('HtmlWebpackPlugin').tap(() => {
        return [
          {
            title: 'react-template',
            template: path.resolve(
              process.cwd(),
              originalUserConfig.templatePath as string
            ),
          },
        ];
      });
    }

    console.log('config', config.toConfig());
    fs.writeFileSync(
      path.resolve(process.cwd(), 'webpack.js'),
      JSON.stringify(config.toConfig()),
      'utf-8'
    );
  });
};

export default reactBasePlugin;
