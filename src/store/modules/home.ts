import type { CurrentMenu, QueryMenu } from '@/types/home'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    collapsed: false,
    currentMenu: <CurrentMenu>{},
    currentMainMenu: <CurrentMenu[]>[],
    currentBreadcrumb: {
      mainMenu: <CurrentMenu>{},
      childMenu: <CurrentMenu[]>[]
    },
    saveMenu: {
      currentMenu: <CurrentMenu>{},
      currentMainMenu: <CurrentMenu[]>[]
    }
  },
  reducers: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed
    },
    getCurrentMenu(state, { payload }: PayloadAction<QueryMenu>) {
      for (const menu of payload.menus) {
        for (const childMenu of menu.children) {
          if (childMenu.url === payload.path) {
            const currentMenu = {
              path: childMenu.url,
              id: String(childMenu.id),
              name: childMenu.name
            }
            if (state.currentBreadcrumb.mainMenu.id !== String(menu.id)) {
              const currentMainMenu = {
                id: String(menu.id),
                name: menu.name,
                path: menu.url
              }
              state.currentMainMenu.push(currentMainMenu)
              Object.assign(state.currentBreadcrumb.mainMenu, currentMainMenu)
              state.currentBreadcrumb.childMenu.length = 0
            }
            if (
              state.currentBreadcrumb.childMenu[
                state.currentBreadcrumb.childMenu.length - 1
              ]?.id !== currentMenu.id
            ) {
              state.currentBreadcrumb.childMenu.push(currentMenu)
            }
            state.currentMenu = currentMenu
          }
        }
      }
    },
    getCurrentMainMenu(state, { payload }: PayloadAction<QueryMenu>) {
      const currentMainMenu = payload.menus.filter(
        (item) => item.url === payload.path
      )[0]
      const currentIndex = state.currentMainMenu.findIndex(
        (item) => item.id === String(currentMainMenu.id)
      )
      if (currentIndex === -1) {
        state.currentMainMenu.push({
          id: String(currentMainMenu.id),
          name: currentMainMenu.name,
          path: currentMainMenu.url
        })
      } else {
        state.currentMainMenu.splice(currentIndex, 1)
      }
    },
    changeBreadcrumbAction(state, { payload }: PayloadAction<string>) {
      const index = state.currentBreadcrumb.childMenu.findIndex(
        (item) => item.path === payload
      )
      if (index === -1) {
        state.currentBreadcrumb.childMenu.length = 0
      } else {
        const length = state.currentBreadcrumb.childMenu.length
        state.currentBreadcrumb.childMenu.splice(index + 1, length - 1)
      }
    },
    ifShowMenu(state) {
      if (state.collapsed) {
        state.saveMenu.currentMainMenu = state.currentMainMenu.slice(0)
        state.currentMainMenu.length = 0
      } else {
        state.currentMainMenu = state.saveMenu.currentMainMenu.slice(0)
        state.saveMenu.currentMainMenu.length = 0
      }
    }
  }
})
export const {
  changeCollapsed,
  getCurrentMenu,
  getCurrentMainMenu,
  changeBreadcrumbAction,
  ifShowMenu
} = homeSlice.actions
export default homeSlice.reducer
