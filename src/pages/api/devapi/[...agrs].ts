import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api/devapi', {
    target: "http://localhost:8010",
    changeOrigin: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    pathRewrite: {
        '^/api/devapi': ''
    },
});

export const config = {
    api: {
        bodyParser: false
    }
}