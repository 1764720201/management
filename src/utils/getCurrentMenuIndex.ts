import type { Datum } from '@/types/menu'
let selectedKeys = ''
let defaultOpenKeys = ''
export const getCurrentMenuIndex = (path: string, menus: Datum[]) => {
  for (const menu of menus) {
    for (const childMenu of menu.children) {
      if (childMenu.url === path) {
        selectedKeys = String(childMenu.id)
        defaultOpenKeys = String(menu.id)
        return {
          selectedKeys,
          defaultOpenKeys
        }
      }
    }
  }
}
