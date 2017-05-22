const path = require('path')
const serve = require('serve')
const appPath = path.join(__dirname, 'public');
const server = serve(appPath, {
    port: 8080
})
