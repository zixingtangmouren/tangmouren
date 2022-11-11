import { exec } from 'shelljs';

/**
 * 删除全部 lib 目录
 * @returns
 */
const removeAllLib = () => {
  return exec('rm -rf packages/*/lib');
};

export default removeAllLib;
