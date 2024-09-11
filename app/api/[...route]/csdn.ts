import { Hono } from 'hono'
import * as htmlparser2 from "htmlparser2"
import { models } from '@/site.config'
import { CustomContext, findIsExist, findIsExistCache, setCache } from '@/lib/index'

const type = 'csdn'

const app = new Hono().get('/', findIsExist(type), findIsExistCache(type), async (c: CustomContext) => {
  const res = await fetch(`https://rss.csdn.net/${models.csdn.username}/rss/map`)
  const resText = await res?.text()
  const feed: htmlparser2.Feed | null = htmlparser2.parseFeed(resText)
  if (resText && feed) {
    setCache(c, type, feed)
  }
  return c.json(feed)
})

export default app