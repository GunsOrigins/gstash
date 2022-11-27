//TODO: Remove this since I don't really need it.
const EleventyFetch = require('@11ty/eleventy-fetch');
const { cyan, blue } = require('kleur/colors');

module.exports = async (originalUrl) => {
  console.log(`${cyan('[data]')} Fetching reads for ${blue(originalUrl)}`);

  const url = `https://plausible.io/api/v1/stats/aggregate?site_id=gstash.org&period=12mo&metrics=pageviews&filters=${encodeURIComponent(
    `event:page==${originalUrl}` +
      (originalUrl.endsWith('/')
        ? `\|${originalUrl.substring(0, originalUrl.length - 1)}`
        : '')
  )}`;

  const res = await EleventyFetch(url, {
    fetchOptions: {
      headers: { Authorization: `Bearer ${process.env.PLAUSIBLE_TOKEN}` },
    },
    duration: '1d',
    type: 'json',
  });

  return `${res.results.pageviews.value}`;
};
