const serve = require('koa-static')
const koa = require('koa')
const app = new koa()

app.use(serve('docs/.'))
app.listen(3000)

console.log(`=> A development server is running at http://localhost:3000`)
