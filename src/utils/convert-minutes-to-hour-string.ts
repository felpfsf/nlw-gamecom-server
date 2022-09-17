// 1080 -> 18:00

export function convertMinToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60)
  const minutes = minutesAmount % 60
  // console.log(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
