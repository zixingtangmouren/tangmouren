export enum TemplateType {
  Local = 'local',
  Git = 'git',
  Npm = 'npm',
}
export interface Template {
  /**
   * 模板名称
   */
  name: string;
  /**
   * 模板描述
   */
  description: string;
  /**
   * 模板类型
   */
  type?: TemplateType;
  /**
   * 模板拉取路径
   * 遵循 download-git-repo 的协议:
   * https://gitlab.com/flippidippi/download-git-repo
   */
  path?: string;
}

/**
 * TODO: 后续扩充模板都此处配置即可
 */
const templates: Template[] = [
  {
    name: 'simple-demo',
    description: 'simplep web template',
  },
];

export default templates;
