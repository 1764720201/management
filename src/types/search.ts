import type { DataNode } from 'antd/es/tree'

export type FormObject = {
  label: string
  name?: string
  type?: 'input' | 'select' | 'timePicker' | 'treeSelect' | 'upload'
  placeholder?: string
  options?: Option[]
  hidden?: boolean
  mode?: 'multiple' | 'tags'
  treeDate?: DataNode[]
}
export interface Option {
  label: string
  value: string | number
  disabled?: boolean
}
