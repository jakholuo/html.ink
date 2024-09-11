import { Hono } from 'hono'
import { models } from '@/site.config'
import { CustomContext, findIsExist, findIsExistCache, setCache } from '@/lib/index'

const type = 'weibo'

const app = new Hono().get('/', findIsExist(type), findIsExistCache(type), async (c: CustomContext) => {
  const res = await fetch(`https://m.weibo.cn/api/container/getIndex?containerid=107603${models.weibo.userid}`)
  const resJson = await res?.json()
  if (resJson?.ok === 1) {
    setCache(c, type, resJson)
  }
  return c.json(resJson)
})

export default app