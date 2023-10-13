import { CommandHandler } from './commandHandler'
import readline from 'readline';

export class App {
  commandHandler: CommandHandler

  constructor() {
    this.commandHandler = new CommandHandler()
  }

  run(): void {
    const readInput = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const getUserInput = () => {
      readInput.question(`Enter the following commands:
       "PLACE X,Y,F",
       "MOVE",
       "LEFT",
       "RIGHT",
       "REPORT"
       or "EXIT" to quit: \n`,
        (command) => {
          try {
            this.commandHandler.run(command)
          } catch (e) {
            console.error(`\n${(e as Error).message}\n`)
          }
          getUserInput()
        });
    }

    getUserInput()
  }
}


