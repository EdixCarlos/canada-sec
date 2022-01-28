const Agent = require('agentkeepalive');

module.exports = {
    '/api': {
        target: 'http://svr-win-app.profuturo.afp:8091/engine/',
        secure: false,
        changeOrigin: true,
        // headers: { withCredentials: true, 'Access-Control-Allow-Credentials': true, 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
        logLevel: 'debug',
        agent: new Agent({
            keepAlive: true, //  Default is true
            keepAliveMsecs: 60000, // Default is 1000
            freeSocketTimeout: 90000, //  Default is 15000
            timeout: 180000, // Default is freeSocketTimeout * 2
            // maxSockets: 100, // Default = Infinity
            maxFreeSockets: 1024, // Default = 256
            // socketActiveTTL: null // Default = null            
        }),
        onProxyReq: (proxyReq, req, res) => {
            // console.log('onProxyReq req', req);
            // add custom header to request
            proxyReq.setHeader('Access-Control-Allow-Credentials', true);
            proxyReq.setHeader('Cache-Control', 'no-cache');
            proxyReq.setHeader('Pragma', 'no-cache');
            // or log the req
        },
        onProxyRes: (proxyRes, req, res) => {
            // console.log('onProxyRes req', req);
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
        }
    }
};