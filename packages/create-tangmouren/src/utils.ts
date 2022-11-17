import * as path from 'path';
import { Template } from './templates';
import * as fs from 'fs-extra';

/**
 * 获取当前版本号
 * @returns
 */
export const getVersion = () => {
  const pkgPath = path.resolve(__dirname, '../package.json');
  const pkgJson = require(pkgPath);
  return pkgJson?.version;
};

/**
 * 打印模板指令
 */
export const printExamples = (templates: Template[]) => {
  // 只选择了模板
  const single = [
    '  $ npm init tangmouren',
    ...templates.map(
      (template) => `  $ npm init tangmouren --template ${template}`
    ),
  ];

  // 选择了模板和路径
  const all = [
    '  $ npm init tangmouren app-demo',
    ...templates.map(
      (template) => `  $ npm init tangmouren app-demo --template ${template}`
    ),
  ];

  [...single, ' ', ...all].forEach((print) => {
    console.log(print);
  });
};

/**
 * 检测该目录内是否为空
 */
export const checkEmpty = (dirPath: string) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, files) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(files.length > 0);
    });
  });
};
