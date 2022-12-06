const { developConfig } = require('../lib');

console.log('rules', developConfig.default.module.rules.get('css'));

console.log('output', developConfig.default.toConfig().output);
