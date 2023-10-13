import { Robot } from './Robot'; // Update with the actual path to your module

describe('Robot', () => {
  it('should create a robot with the given coordinates and direction', () => {
    const robot = new Robot(1, 2, 'NORTH');
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
    expect(robot.direction).toBe('NORTH');
  });

  it('should move the robot to the specified coordinates', () => {
    const robot = new Robot(1, 2, 'NORTH');
    robot.move(3, 4);
    expect(robot.x).toBe(3);
    expect(robot.y).toBe(4);
  });

  it('should turn the robot to the specified direction', () => {
    const robot = new Robot(1, 2, 'NORTH');
    robot.turn('EAST');
    expect(robot.direction).toBe('EAST');
  });

  it('should return the current position of the robot as a string', () => {
    const robot = new Robot(1, 2, 'NORTH');
    const position = robot.getPosition();
    expect(position).toBe('1, 2, NORTH');
  });
});
