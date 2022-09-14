// 18:00 -> ["18", "00"] -> [18, 00]

export function convertHourStringToMinutes(hourString: string) {
  const [hours, min] = hourString.split(':').map(Number)

  const minAmount = hours * 60 + min

  return minAmount
}
