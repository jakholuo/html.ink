import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import CsdnStyle from '@/styles/csdn.module.scss'

export default function Csdn() {
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
    <ul className={clsx(CsdnStyle['csdn-container'])}>
      {
        csdn.slice(0, 5).map((item: any, index: number) => {
          return (
            <li key={index} className={clsx(CsdnStyle['csdn-item'])}>
              <div className="border rounded-2xl p-4 w-full shadow cursor-default hover:bg-gray-50">
                <a className="text-base text-gray-800 font-bold break-words text-left tooltip tooltip-bottom hover:underline" data-tip={dayjs(item.pubDate).format('YYYY-MM-DD HH:mm:ss')} href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                <p className="text-sm text-gray-400 break-words pt-3">{item.description}</p>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}
