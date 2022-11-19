import { Command } from 'commander';
import templates from './templates';
import { getVersion, printExamples } from './utils';
import Creater from './Creater';

const pkgVersion = getVersion();

(() => {
  const program = new Command();

  program
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .name(`create-tangmouren version ${pkgVersion}`)
    .usage('<command> [options]');

  program.option('--template <template>', 'select a template');

  program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    printExamples(templates);
    process.exit(0);
  });

  program.parse(process.argv);

  const dirname: string = program.args[0] ? program.args[0] : '.';
  const options = program.opts();

  const templateName =
    options.template !== undefined ? options.template : program.args[1];

  console.log('create-tangmouren version:', pkgVersion);
  console.log('create-tangmouren args', dirname, templateName);

  void new Creater({
    dirname,
    templateName,
  }).run();
})();
