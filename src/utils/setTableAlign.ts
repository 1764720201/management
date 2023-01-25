export const setTableAlign = <T extends Array<object>>(
  columns: T,
  type: 'center' | 'left' | 'right'
) => {
  return columns.map((column) => {
    return { ...column, align: type }
  })
}
