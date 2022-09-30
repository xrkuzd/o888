import { NextPage } from 'next'

import { ComponentType, ReactElement, ReactNode } from 'react'

// This type allows us to give each of our pages their own custom layout components.
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode
  layout?: ComponentType
}
