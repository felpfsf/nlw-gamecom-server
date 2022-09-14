// 1080 -> 18:00

export function convertMinToHourString(minAmount: number) {
  const hours = Math.floor(minAmount / 60)
  const min = minAmount % 60

  return `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}
