import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import XlogStyle from '@/styles/xlog.module.scss'

export default function Xlog() {
  const [csdn, setCsdn] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/xlog')
      const { items } = await res.json()
      setCsdn(items)
    }
    fetchData()
  }, [])

  return (
    <ul className={clsx(XlogStyle['xlog-container'])}>
      {
        csdn.slice(0, 5).map((item: any, index: number) => {
          return (
            <li key={index} className={clsx(XlogStyle['xlog-item'])}>
              <div className="border rounded-2xl p-4 w-full shadow cursor-default hover:bg-gray-50">
                <a className="text-base text-gray-800 font-bold break-words text-left tooltip tooltip-bottom hover:underline" data-tip={dayjs(item.pubDate).format('YYYY-MM-DD HH:mm:ss')} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                <p className={clsx('text-sm text-gray-400 break-words pt-3 overflow-hidden')}>{item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}</p>
                <p className="pt-3"><img src={item.imgs[0]} className="border rounded-2xl" /></p>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}
