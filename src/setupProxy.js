const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://www.google.com',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware(proxy)
  );
};