import { Hono } from 'hono'
import { models } from '@/site.config'
import { parseFeed } from '@rowanmanning/feed-parser'
import { CustomContext, findIsExist, findIsExistCache, setCache, extractImageUrlsFromText } from '@/lib/index'

const type = 'xlog'

const app = new Hono().get('/', findIsExist(type), findIsExistCache(type), async (c: CustomContext) => {
  const res = await fetch(`https://${models.xlog.username}.xlog.app/feed`)
  const resText = await res?.text()
  const feed: any = parseFeed(resText)
  let cloneFeed = null
  if (resText && feed) {
    cloneFeed = {
      items: feed.items.map((item: any) => {
        return {
          title: item.title,
          pubDate: item.pubDate,
          url: item.url,
          description: item.description,
          imgs: extractImageUrlsFromText(String(item.content))
        }
      })
    }
    setCache(c, type, cloneFeed)
  }
  return c.json(cloneFeed)
})

export default app