import * as path from 'path';
import templates, { Template, TemplateType } from './templates';
import * as inquirer from 'inquirer';
import * as fs from 'fs-extra';
import { checkEmpty, throwError } from './utils';
// @ts-ignore
import download from 'download-git-repo';
import chalk = require('chalk');

interface CreaterParams {
  dirname: string;
  templateName: string;
}

export default class Creater {
  private readonly dirname: string;
  private templateName: string;
  private readonly dirPath: string;

  constructor(params: CreaterParams) {
    this.dirname = params.dirname;
    this.templateName = params.templateName;
    this.dirPath = path.resolve(process.cwd(), this.dirname);
  }

  async run() {
    if (!this.templateName) {
      this.templateName = await this.selectTemplate();
    }

    await fs.ensureDir(this.dirPath);
    const isEmpty = await checkEmpty(this.dirPath);
    if (!isEmpty) {
      const { go } = await inquirer.prompt({
        type: 'confirm',
        name: 'go',
        message:
          'The existing file in the current directory. Are you sure to continue?',
        default: false,
      });
      if (!go) process.exit(1);
    }

    await this.downloadAndGenerateProject();
  }

  async selectTemplate() {
    const defaultTemplate = templates[0];

    const answer = await inquirer.prompt({
      type: 'list',
      name: 'template',
      loop: false,
      message: 'Please select a template',
      default: defaultTemplate,
      choices: templates.map((item) => {
        return {
          name: item.description,
          value: item.name,
        };
      }),
    });

    return answer.template;
  }

  async downloadAndGenerateProject() {
    const template = templates.find(
      (template) => template.name === this.templateName
    );

    if (!template) {
      throwError(` This template [${this.templateName}] does not exist`);
      return;
    }

    console.log('create-tang: Please wait while the project is initializing……');

    switch (template.type) {
      case TemplateType.Local:
        this.localGenarate(template);
        break;
      case TemplateType.Git:
        break;
      case TemplateType.Npm:
        break;
      default:
        this.localGenarate(template);
    }

    this.printSuccessTips(template);
  }

  private localGenarate(template: Template) {
    const { name } = template;
    const templateDir = path.resolve(__dirname, '../templates', name);

    if (!fs.existsSync(templateDir)) {
      this.printFaildTips(name);
    }

    fs.copy(templateDir, this.dirPath, (error) => {
      if (error) {
        this.printFaildTips(name);
      }
    });
  }

  private downloadFromGit(template: Template) {
    const { path, name } = template;

    download(path, this.dirPath, (err: any) => {
      if (err) {
        this.printFaildTips(name);
      }
    });
  }

  private installFromNpm() {
    // TODO: npm 待完善
  }

  private printSuccessTips(template: Template) {
    console.log(
      chalk.greenBright(`\n${template.description} created successfully.\n`)
    );

    console.log(chalk.cyan(`    cd ${this.dirname}`));
    console.log(chalk.cyan('    npm install'));
    console.log(chalk.cyan('    npm run start'));
    console.log();
  }

  private printFaildTips(name: string) {
    throwError(`${name} template creation failed.`);
  }
}
