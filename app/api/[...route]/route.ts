import { Hono, Context, Next } from 'hono'
import { handle } from 'hono/vercel'
import { Cache, put, get, del, clear } from 'memory-cache'
import weiboRouter from "./weibo"
import csdnRouter from "./csdn"
import xlogRouter from "./xlog"

export const runtime = 'edge'
const app = new Hono().basePath('/api')

type cacheType = {
  get: typeof get
  put: typeof put
  del: typeof del
  clear: typeof clear
}
const cache: cacheType = new Cache()

export interface CustomContext extends Context {
  cache?: cacheType
}

app.use(async (c: CustomContext, next) => {
  c.cache = cache
  await next()
})

app.route('/weibo', weiboRouter)
app.route('/csdn', csdnRouter)
app.route('/xlog', xlogRouter)

export const GET = handle(app)