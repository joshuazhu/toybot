export class Robot {
  x: number
  y: number
  direction: string

  constructor(x: number, y: number, direction: string) {
    this.x = x
    this.y = y
    this.direction = direction
  }

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }

  turn(direction: string) {
    this.direction = direction
  }

  getPosition() {
    return `${this.x}, ${this.y}, ${this.direction}`
  }
}
