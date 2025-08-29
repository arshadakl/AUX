import { describe, expect, it } from 'vitest';

// Helper functions to test
const add = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => a * b;
const isEven = (number_: number): boolean => number_ % 2 === 0;

describe('Basic Math Operations', () => {
  it('should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  it('should correctly multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });

  it('should correctly identify even numbers', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(0)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });
});
