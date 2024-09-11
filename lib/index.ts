import { Context, Next } from 'hono'
import { put, get, del, clear } from 'memory-cache'
import { home, pages, apiCache } from '@/site.config'

type cacheType = {
  get: typeof get
  put: typeof put
  del: typeof del
  clear: typeof clear
}

export interface CustomContext extends Context {
  cache?: cacheType
}

export const isExistInHome = (type: string) => {
  return home.find(item => item.type === type);
}

export const isExistInPages = (type: string) => {
  return pages.find(item =>
    item.content.some(contentItem => contentItem.type === type)
  );
}

export const isExistInPagesByPermalink = (permalink: string) => {
  return pages.find(item => item.permalink === permalink);
}

export const findIsExist = (type: string) => async (c: Context, next: Next) => {
  if (!(isExistInHome(type) || isExistInPages(type))) {
    return c.notFound()
  }
  await next()
}

export const findIsExistCache = (type: string) => async (c: CustomContext, next: Next) => {
  const cache = c.cache?.get(`${type}_data`)
  if (cache) {
    console.log(`${type}: 读取缓存`)
    return c.json(JSON.parse(cache))
  }
  await next()
}

export const setCache = (c: CustomContext, type: string, content: any) => {
  console.log(`${type}: 设置缓存`)
  if (apiCache.enable) c.cache?.put(`${type}_data`, JSON.stringify(content), apiCache.ms)
  else c.cache?.put(`${type}_data`, JSON.stringify(content))
}

export const extractImageUrlsFromText = (text: string) => {
  // 定义正则表达式以匹配 img 标签和其 src 属性
  const imgSrcRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi
  // 使用正则表达式匹配所有符合条件的 img 标签
  const matches = []
  let match
  while ((match = imgSrcRegex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}