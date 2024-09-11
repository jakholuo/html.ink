import { useEffect, useState } from 'react'

export default function Weibo() {
  const [weibo, setWeibo] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/weibo')
      const { data } = await res.json()
      setWeibo(data.cards)
    }
    fetchData()
  }, [])

  return <div>
    <ul>
      {
        weibo.map((item: any, index: number) => {
          return (
            <li key={index}>
              <a className="text-green-600" href={item.scheme} target="_blank" rel="noopener noreferrer">{item.mblog.text}</a>
              <p className='text-gray-400'>{item.mblog.created_at}</p>
              <p>{item.pubDate}</p>
            </li>
          )
        })
      }
    </ul>
  </div>
}
