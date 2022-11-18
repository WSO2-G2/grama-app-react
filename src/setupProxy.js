const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware(proxy)
  );
};