export const floorMod = (n: number, total: number) => {
  const remain = n % total

  return remain >= 0 ? remain : remain + total
}
