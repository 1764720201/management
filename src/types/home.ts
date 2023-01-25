import { Datum } from './menu'
export type CurrentMenu = {
  id: string
  path: string
  name: string
}
export type QueryMenu = {
  menus: Datum[]
  path: string
}
