export const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"]
export const COMMANDS = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT", "EXIT"]
export const MOVE_STEP_MAP: {
  [key: string]: number[]
} = {
  "NORTH": [1, 0],
  "EAST": [0, 1],
  "SOUTH": [-1, 0],
  "WEST": [0, -1]
}
