export const parsePosition = (
  position: string,
  relativeNum: number,
): number => {
  const positionNum = parseFloat(position)

  return position.endsWith('%')
    ? (relativeNum * positionNum) / 100
    : positionNum
}
