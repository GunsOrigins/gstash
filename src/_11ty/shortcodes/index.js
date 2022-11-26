const lucide = require('./lucide');
const postReads = require('./postReads');
const respimg = require('./respimg');
const simpleicon = require('./simpleicon');


/**
 * @param {string} path
 */
const absoluteUrl = (path) => new URL(path, 'https://gstash.org').toString();

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
module.exports = (eleventyConfig) => {
  eleventyConfig.addShortcode('lucide', lucide);
  eleventyConfig.addShortcode('simpleicon', simpleicon);
  eleventyConfig.addAsyncShortcode('respimg', respimg);
  eleventyConfig.addAsyncShortcode('postReads', postReads);
};
