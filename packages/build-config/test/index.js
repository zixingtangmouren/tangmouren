const { developConfig } = require('../lib');

const config = developConfig.toConfig();

console.log('output', config);
