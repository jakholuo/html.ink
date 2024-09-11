'use client'
import { useEffect, useState, ReactDOM, ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { title, occupation, intro, home } from '@/site.config'
import variables from '@/styles/variables.module.scss'

interface HomeComponentItem {
  title: string
  type: string
  component: ComponentType<{}>
}

const loadComponent = (): HomeComponentItem[] => {
  return home.map((item) => {
    return {
      title: item.title,
      type: item.type,
      component: dynamic(() => import(`@/components/${item.type}`)),
    }
  })
}

export default function Home() {
  useEffect(() => {
  }, [])

  return (
    <div className="container mx-auto px-6 py-8 flex flex-wrap">
      <div className="flex flex-col w-full lg:w-2/5 lg:pr-4">
        <img className="rounded-full w-44 border" src="https://creatorspace.imgix.net/users/clcr4pxwi0hdwo80yuqtp050c/l8mvVzVMjCWFcPLY-rogie-avatar.png?w=300&h=300" alt="logo"/>
        <div className="mt-6 ml-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <h2 className="mt-2 text-2xl text-gray-600">{occupation}</h2>
          <p className="mt-6 text-xl text-gray-400">{intro}</p>
        </div>
      </div>
      <div className="w-full lg:w-3/5">
        {
          loadComponent().map((item) => {
            return (
              <div key={item.type} className="px-4">
                <div className="text-lg p-3 font-bold">{item.title}</div>
                <item.component />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
