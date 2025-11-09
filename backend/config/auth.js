module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'deyok_fallback_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  jwtCookieExpire: process.env.JWT_COOKIE_EXPIRE || 7,
};
