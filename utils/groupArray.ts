export const groupArray = (items: any[] = [], numColumns: number) => {
  const grouped = []
  for (let i = 0; i < items.length; i += numColumns) {
    grouped.push(items.slice(i, i + numColumns))
  }
  return grouped
}
