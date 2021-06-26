import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api/kanjiapi', {
    target: "https://kanjiapi.dev/v1",
    changeOrigin: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    pathRewrite: {
        '^/api/kanjiapi': ''
    },
});

export const config = {
    api: {
        bodyParser: false
    }
}