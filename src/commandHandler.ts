import { Robot, Table } from './models';
import { MOVE_STEP_MAP, COMMANDS, DIRECTIONS } from './constants';
import { floorMod } from './utils';

type PlaceCommandArgs = {
  x: number
  y: number
  direction: string
}

export class CommandHandler {
  robot?: Robot
  table: Table

  constructor() {
    this.table = new Table()
  }

  validateCommand(commandInput: string): void {
    const commandInputArray: string[] = commandInput.split(' ');
    const command: string = commandInputArray[0]
    const commandArgs: string[] = commandInputArray.slice(1)

    if (!COMMANDS.includes(command)) {
      throw new Error(`Unknown command: ${command}`);
    }

    if (command === "PLACE" && commandArgs.length === 1 && commandArgs[0].split(',').length === 3) {
      return;
    }

    if (command !== "PLACE" && commandArgs.length === 0) {
      return;
    }

    throw new Error(`Invalid command: ${commandInput}`);
  }

  parsePlaceCommandArgs(commandArgs: string[]): PlaceCommandArgs {
    const x = Number(commandArgs[0]);
    const y = Number(commandArgs[1]);
    const direction = commandArgs[2];

    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error(`Robot coordinates are invalid: ${commandArgs.join(",")}`);
    }

    if (!DIRECTIONS.includes(direction)) {
      throw new Error(`Invalid direction: ${direction}`)
    }

    return { x, y, direction };
  }

  handlePlaceCommand(commandArgs: string) {
    const placeArgs: PlaceCommandArgs = this.parsePlaceCommandArgs(commandArgs.split(','))

    if (!this.table.isValidPositionOnTable(placeArgs.x, placeArgs.y)) {
      throw new Error(`Place position is not on the table: ${placeArgs.x}, ${placeArgs.y}`)
    }

    this.robot = new Robot(placeArgs.x, placeArgs.y, placeArgs.direction)
  }

  handleMoveCommand() {
    if (!this.robot) {
      throw new Error("Invalid command, please execute 'PLACE' command first")
    }

    const moveStep = MOVE_STEP_MAP[this.robot?.direction!]
    const newPositionX = this.robot?.x! + moveStep[0]
    const newPositionY = this.robot?.y! + moveStep[1]

    if (!this.table.isValidPositionOnTable(newPositionX, newPositionY)) {
      throw new Error("Cannot move, Robot will fail off the table")
    }

    this.robot?.move(newPositionX, newPositionY)
  }

  handleTurnCommands(command: string) {
    if (!this.robot) {
      throw new Error("Invalid command, please execute 'PLACE' command first")
    }

    const currentDirectionIndex = DIRECTIONS.indexOf(this.robot?.direction!)
    const nextDirectionIndex = command === "LEFT"
      ? floorMod(currentDirectionIndex - 1, DIRECTIONS.length)
      : (currentDirectionIndex + 1) % DIRECTIONS.length

    this.robot?.turn(DIRECTIONS[nextDirectionIndex])
  }

  handleReportCommand() {
    if (!this.robot) {
      throw new Error("Invalid command, please execute 'PLACE' command first")
    }

    console.log(`${this.robot.getPosition()}`)
  }

  run(commandInput: string) {
    this.validateCommand(commandInput)

    const commandInputArray = commandInput.split(' ')
    const command = commandInputArray[0]
    const commandArgs = commandInputArray[1]

    switch (command) {
      case "PLACE":
        this.handlePlaceCommand(commandArgs)
        return
      case "MOVE":
        this.handleMoveCommand()
        return
      case "LEFT":
      case "RIGHT":
        this.handleTurnCommands(command)
        return
      case "REPORT":
        this.handleReportCommand()
        return
      case "EXIT":
        process.exit(0)
        return
      default:
        throw new Error(`Unknown command: ${command}`)
    }
  }
}
