import { HOME } from '@/constant'
import React, { FC } from 'react'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

interface RouteQuery {
  url: string
  children?: RouteQuery[]
}

export const addRoutes = (routeQuery: RouteQuery[]): RouteObject[] => {
  const newRoutes: RouteObject[] = []
  const map = new Map<RouteObject, RouteObject[]>()
  for (let i = 0; i < routeQuery.length; i++) {
    const m = map.get({
      path: routeQuery[i].url
    })
    if (!m) {
      map.set(
        {
          path: routeQuery[i].url
        },
        routeQuery[i]?.children?.map((item) => {
          const newUrl = item.url?.replace(`/${HOME}`, '')
          const routeName =
            routeQuery[i].url && lazy(() => import(`@/pages${newUrl}`))
          return {
            path: item.url,
            element: item.url && React.createElement<FC>(routeName)
          }
        }) || []
      )
    }
  }
  map.forEach((item, key) => {
    newRoutes.push(...item, key)
  })
  return newRoutes
}
