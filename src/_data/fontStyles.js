const postcss = require('postcss');
const { readFile } = require('fs/promises');

const logSize = require('../utils/logSize');

module.exports = async () => {
  
  const inter = await readFile('./src/assets/fonts/inter/inter.css', 'utf-8');
  const satoshi = await readFile('./src/assets/fonts/satoshi/satoshi.css', 'utf-8');
  const switzer = await readFile('./src/assets/fonts/switzer/switzer.css', 'utf-8');

  const { content: css } = await postcss([
    require('autoprefixer'),
    require('cssnano'),
  ]).process(inter + satoshi + switzer, {
    from: undefined,
    to: undefined,
  });

  logSize(css.length, 'inlinedFontStyles');

  return css;
};
