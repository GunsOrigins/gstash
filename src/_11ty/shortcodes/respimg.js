const Image = require('@11ty/eleventy-img');
const imageSize = require('image-size');
const lqip = require('../lqip');
const { parseHTML } = require('linkedom');

module.exports = async (src, alt) => {
  const { document } = parseHTML('');

  const { width: originalWidth, height: originalHeight } =
    imageSize.imageSize(src);

  const stats = await Image(src, {
    widths: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, originalWidth]
      .filter((a) => a <= originalWidth)
      .sort((a, b) => a - b),
    formats: ['avif', 'webp', 'jpeg'],
    outputDir: './_site/images',
    urlPath: '/images/',
  });

  const lowsrc = stats.jpeg[stats.jpeg.length - 1];

  const lqipURI = await lqip(lowsrc.outputPath);

  const picElem = document.createElement('picture');

  Object.values(stats).forEach((i) => {
    const srcElem = document.createElement('source');
    srcElem.setAttribute('type', i[0].sourceType);
    srcElem.setAttribute('srcset', i.map((entry) => entry.srcset).join(', '));
    srcElem.setAttribute('sizes', '100vw');

    picElem.appendChild(srcElem);
  });

  const newImgElem = document.createElement('img');
  newImgElem.setAttribute('src', lowsrc.url);
  newImgElem.setAttribute('width', originalWidth);
  newImgElem.setAttribute('height', originalHeight);
  newImgElem.setAttribute('alt', alt);
  newImgElem.setAttribute('loading', 'lazy');
  newImgElem.setAttribute('decoding', 'async');
  newImgElem.setAttribute('sizes', '100vw');
  newImgElem.setAttribute(
    'style',
    `content-visibility: auto; background-size: cover; background-image: url("${lqipURI}")`
  );

  picElem.appendChild(newImgElem);

  return picElem.toString();
};
