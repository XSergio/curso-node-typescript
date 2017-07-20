var arquivo = '../env/' + process.env.NODE_ENV + '.env.js';
module.exports = function () { return require(arquivo); };
//module.exports = () => require(`../env/${process.env.NODE_ENV}.env.js`); 
