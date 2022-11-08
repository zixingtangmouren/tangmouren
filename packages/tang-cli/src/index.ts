import { Command } from 'commander';
import { start, build } from 'build-scripts';

const program = new Command();

program
  .name('@tang/tang-cli')
  .description('集成多个框架的脚手架')
  .version('1.0.0');

program
  .command('start')
  .description('启动调试模式')
  .action(() => {
    console.log('启动开发者服务');
  });

program
  .command('build')
  .description('构建产物')
  .action(() => {
    console.log('开始构建产物');
  });

program
  .command('create')
  .description('创建项目工程')
  .action(() => {
    console.log('创建项目工程');
  });

program.parse();
