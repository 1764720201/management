export interface GetMenuSuccess {
  code: number
  data: Datum[]
}

export interface Datum {
  id: number
  name: string
  url: string
  icon: string
  type: number
  permission?: string
  children: Child2[]
}

interface Child2 {
  id: number
  name: string
  url: string
  icon?: string
  type: number
  permission?: string
  children: Child[]
}

interface Child {
  id: number
  name: string
  url?: string
  icon?: string
  type: number
  permission: string
  children: any[]
}
