'use client'
import { useEffect, useState } from 'react'
import { notFound } from "next/navigation"
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { pages } from '@/site.config'
import { isExistInPagesByPermalink } from '@/lib/index'

export default function Cs({ params }: any) {
  const [slugItem, setSlugItem] = useState<any>({})

  useEffect(() => {
    const currentSlugItem = isExistInPagesByPermalink(params.slug)
    setSlugItem(currentSlugItem)
  }, [])

  if (slugItem) {
    return (
      <>
        <Head>
          <title>My page title</title>
        </Head>
        <button className="btn btn-active btn-accent">{slugItem.name}</button>
      </>
    )
  }

  return notFound()
}
