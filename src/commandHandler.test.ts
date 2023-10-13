import { CommandHandler } from './commandHandler'; // Update with the actual path to your module
import { Robot } from './models'; // Update with the actual path to your module

describe('CommandHandler', () => {
  let commandHandler: CommandHandler;

  describe('validateCommand', () => {
    beforeEach(() => {
      commandHandler = new CommandHandler();
    });

    it('should throw an error for an unknown command', () => {
      expect(() => commandHandler.validateCommand('UNKNOWN')).toThrow('Unknown command: UNKNOWN');
    });

    it('should throw an error when PLACE command not having valid arguments', () => {
      expect(() => commandHandler.validateCommand('PLACE invalid args')).toThrow("Invalid command: PLACE invalid args");
    });

    it('should throw an error when non PLACE command having arguments', () => {
      expect(() => commandHandler.validateCommand('MOVE args')).toThrow("Invalid command: MOVE args");
    });

    it('should not throw an error when has valid PLACE command', () => {
      expect(() => commandHandler.validateCommand('PLACE 1,1,NORTH')).not.toThrowError();
    });
  })

  describe('parsePlaceCommandArgs', () => {
    beforeEach(() => {
      commandHandler = new CommandHandler();
    });

    it('should throw an error when PLACE command coordinates are not number', () => {
      expect(() => commandHandler.parsePlaceCommandArgs('a,a,NORTH'.split(','))).toThrow("Robot coordinates are invalid: a,a");
    });

    it('should throw an error when PLACE direction is not valid', () => {
      expect(() => commandHandler.parsePlaceCommandArgs('1,1,invalid'.split(','))).toThrow("Invalid direction: invalid");
    });

    it('should return place command args when having valid input', () => {
      expect(() => commandHandler.parsePlaceCommandArgs('1,1,NORTH'.split(','))).not.toThrowError()
    })
  })

  describe("handlePlaceCommand", () => {
    beforeEach(() => {
      commandHandler = new CommandHandler();
    });
    it('should handle a valid PLACE command', () => {
      commandHandler.handlePlaceCommand('1,1,NORTH');
      expect((commandHandler as any).robot).toBeInstanceOf(Robot);
    });

    it('should throw an error when PLACE command coordinates out of the table', () => {
      expect(() => commandHandler.handlePlaceCommand('10,1,NORTH')).toThrow('Place position is not on the table: 10, 1');
    });
  })

  describe("handleMoveCommand", () => {
    beforeEach(() => {
      commandHandler = new CommandHandler();
    });
    it('should throw an error when trying to move without a valid PLACE command', () => {
      expect(() => commandHandler.run('MOVE')).toThrow("Invalid command, please execute 'PLACE' command first");
    });

    it('should handle MOVE command when the position is valid', () => {
      commandHandler.run('PLACE 0,0,NORTH');
      commandHandler.handleMoveCommand();
      expect((commandHandler as any).robot.getPosition()).toEqual(`1, 0, NORTH`);
    });

    it('should throw an error for MOVE command when the position is invalid', () => {
      commandHandler.run('PLACE 4,0,NORTH');
      expect(() => commandHandler.handleMoveCommand()).toThrow('Cannot move, Robot will fail off the table');
    });
  })

  describe("handleTurnCommands", () => {
    beforeEach(() => {
      commandHandler = new CommandHandler();
    });

    it('should throw an error when trying to move without a valid PLACE command', () => {
      expect(() => commandHandler.run('MOVE')).toThrow("Invalid command, please execute 'PLACE' command first");
    });

    it('should handle LEFT and RIGHT commands', () => {
      commandHandler.run('PLACE 1,1,NORTH');
      commandHandler.run('LEFT');
      expect((commandHandler as any).robot.direction).toBe('WEST');
      commandHandler.run('RIGHT');
      expect((commandHandler as any).robot.direction).toBe('NORTH');
    });
  })

  describe("handleTurnCommands", () => {
    beforeEach(() => {
      commandHandler = new CommandHandler();
    });

    it('should throw an error when trying to move without a valid PLACE command', () => {
      expect(() => commandHandler.run('MOVE')).toThrow("Invalid command, please execute 'PLACE' command first");
    });

    it('should handle LEFT and RIGHT commands', () => {
      commandHandler.run('PLACE 1,1,NORTH');
      commandHandler.handleTurnCommands('LEFT')
      expect((commandHandler as any).robot.direction).toBe('WEST');
      commandHandler.handleTurnCommands('RIGHT')
      expect((commandHandler as any).robot.direction).toBe('NORTH');
    });
  })

  describe("run", () => {
    it('should handle a valid PLACE command', () => {
      commandHandler.run('PLACE 1,1,NORTH');
      expect((commandHandler as any).robot).toBeInstanceOf(Robot);
    });

    it('should throw an error for an invalid PLACE command', () => {
      expect(() => commandHandler.run('PLACE 1,NORTH')).toThrow('Invalid command: PLACE 1,NORTH');
    });

    it('should handle MOVE command when the position is valid', () => {
      commandHandler.run('PLACE 0,0,NORTH');
      commandHandler.run('MOVE');
      expect((commandHandler as any).robot.getPosition()).toEqual(`1, 0, NORTH`);
    });

    it('should throw an error for MOVE command when the position is invalid', () => {
      commandHandler.run('PLACE 4,0,NORTH');
      expect(() => commandHandler.run('MOVE')).toThrow('Cannot move, Robot will fail off the table');
    });

    it('should handle LEFT and RIGHT commands', () => {
      commandHandler.run('PLACE 1,1,NORTH');
      commandHandler.run('LEFT');
      expect((commandHandler as any).robot.direction).toBe('WEST');
      commandHandler.run('RIGHT');
      expect((commandHandler as any).robot.direction).toBe('NORTH');
    });

    it('should handle EXIT command', () => {
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation((code?: number) => undefined as never);
      commandHandler.run('EXIT');
      expect(exitSpy).toHaveBeenCalledWith(0);
      exitSpy.mockRestore();
    });
  })
});
