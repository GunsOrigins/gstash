module.exports =
  process.env.NODE_ENV === 'production'
    ? process.env.DEPLOY_ENV === 'staging'
      ? 'https://staging.gstash.org'
      : 'https://gstash.org'
    : 'http://localhost:8080';
