import '@testing-library/jest-dom';
import { parseTimeInput } from '../components/Inputs';
import { formatTimeInput } from '../components/Inputs';
import { getYearsChoices } from '../components/Inputs';

describe('parseTimeInput function', () => {
  test('function should be defined', () => {
    expect(parseTimeInput).toBeDefined();
    expect(parseTimeInput).not.toBeUndefined();
  });

  test('function should return a int!', () => {
    expect(parseTimeInput('04:12')).toBe(15120);
    expect(parseTimeInput('10:10')).toBe(36600);
    expect(parseTimeInput('15:56')).toBe(57360);
  });
});

describe('formatTimeInput function', () => {
  test('function should be defined', () => {
    expect(formatTimeInput).toBeDefined();
    expect(formatTimeInput).not.toBeUndefined();
  });

  test('function should return a string', () => {
    expect(typeof formatTimeInput(2000)).toBe('string');
  });

  test('function should return format 00:00', () => {
    expect(formatTimeInput(57360)).toBe('15:56');
    expect(formatTimeInput(36600)).toBe('10:10');
    expect(formatTimeInput(15120)).toBe('04:12');
  });
});

describe('getYearsChoices function', () => {
  test('function should be defined', () => {
    expect(getYearsChoices).toBeDefined();
    expect(getYearsChoices).not.toBeUndefined();
  });

  test('function should return an array with objects instead', () => {
    expect(Array.isArray(getYearsChoices())).toBe(true);
  });
});