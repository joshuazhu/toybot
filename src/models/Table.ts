const DEFAULT_DIMENSION = 5

export class Table {
  dimensionX: number
  dimensionY: number

  constructor(dimensionX: number = DEFAULT_DIMENSION, dimensionY: number = DEFAULT_DIMENSION) {
    this.dimensionX = dimensionX
    this.dimensionY = dimensionY
  }

  isValidPositionOnTable(x: number, y: number): boolean {
    return x > -1 && x < this.dimensionX && y > -1 && y < this.dimensionY
  }
}
