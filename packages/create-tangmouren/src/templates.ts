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
  type?: 'local' | 'git' | 'npm';
  /**
   * 模板拉取路径
   */
  path?: string;
}

/**
 * TODO: 后续扩充模板都此处配置即可
 */
const templates: Template[] = [
  {
    name: 'simplep-demo',
    description: 'simplep web template',
  },
];

export default templates;
