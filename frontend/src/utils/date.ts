export function formatDate(isoDate: string): string {
  if (!isoDate) return '-'
  const [year, month, day] = isoDate.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}

export function toInputDate(isoDate: string): string {
  if (!isoDate) return ''
  return isoDate.split('T')[0]
}
