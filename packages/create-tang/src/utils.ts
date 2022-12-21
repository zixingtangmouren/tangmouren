import * as path from 'path';
import { Template } from './templates';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';

/**
 * 获取当前版本号
 * @returns
 */
export const getVersion = (): string | undefined => {
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
    '  $ npm init tang',
    ...templates.map(
      (template) => `  $ npm init tang --template ${template.name}`
    ),
  ];

  // 选择了模板和路径
  const all = [
    '  $ npm init tang app-demo',
    ...templates.map(
      (template) => `  $ npm init tang app-demo --template ${template.name}`
    ),
  ];

  [...single, ' ', ...all].forEach((print) => {
    console.log(print);
  });
};

/**
 * 检测该目录内是否为空
 */
export const checkEmpty = async (dirPath: string) => {
  return await new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, files) => {
      if (error !== null) {
        reject(error);
        return;
      }

      resolve(files.length === 0);
    });
  });
};

/**
 * 打印异常并退出
 * @param errorMsg
 */
export const throwError = (errorMsg: string) => {
  console.log(chalk.redBright(`create-tang Error: ${errorMsg}.`));
  process.exit(1);
};
