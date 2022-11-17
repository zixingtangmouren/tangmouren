import * as path from 'path';
import templates from './templates';
import inquirer from 'inquirer';
import * as fs from 'fs-extra';
import { checkEmpty } from './utils';

interface CreaterParams {
  dirname: string;
  templateName: string;
}

export default class Creater {
  private dirname: string;
  private templateName: string;
  private dirPath: string;

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
      throw new Error(`create-tangmouren error: ${this.templateName} `);
    }
  }
}
