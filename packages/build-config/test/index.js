const { developConfig } = require('../lib');

const rules = developConfig.default.module.rules;

console.log('rules', rules);

const config = developConfig.default.toConfig();

console.log('output', config);
