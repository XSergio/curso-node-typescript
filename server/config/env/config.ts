let arquivo: string = '../env/' + process.env.NODE_ENV + '.env.js';
module.exports = () => require(arquivo);
//module.exports = () => require(`../env/${process.env.NODE_ENV}.env.js`);