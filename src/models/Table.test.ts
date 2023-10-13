import { Table } from './Table';

describe('Table', () => {
  it('should create a table with default dimensions when no dimensions are provided', () => {
    const table = new Table();
    expect(table.dimensionX).toBe(5);
    expect(table.dimensionY).toBe(5);
  });

  it('should create a table with specified dimensions', () => {
    const table = new Table(7, 6);
    expect(table.dimensionX).toBe(7);
    expect(table.dimensionY).toBe(6);
  });

  it('should validate a position within the table boundaries', () => {
    const table = new Table(5, 5);
    expect(table.isValidPositionOnTable(3, 2)).toBe(true);
    expect(table.isValidPositionOnTable(0, 0)).toBe(true);
    expect(table.isValidPositionOnTable(4, 4)).toBe(true);
  });

  it('should not validate a position outside the table boundaries', () => {
    const table = new Table(5, 5);
    expect(table.isValidPositionOnTable(6, 2)).toBe(false);
    expect(table.isValidPositionOnTable(0, -1)).toBe(false);
    expect(table.isValidPositionOnTable(5, 5)).toBe(false);
  });
});
