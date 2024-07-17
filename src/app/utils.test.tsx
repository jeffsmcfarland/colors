import {describe, expect, test} from '@jest/globals';
import {invertColor, padZero, validateHex, filterAlpha} from './utils';

describe('invertColor', () => {
  test('converts white hex to black hex', () => {
    expect(invertColor('#FFFFFF')).toBe('#000000');
  });
});

describe('validateHex', () => {
    test('throws error if hex is not 6 or 8 chars', () => {
    expect(() => validateHex('#FFFF')).toThrow('Invalid HEX color.');
  })
});

describe('padZero', () => {
  test('adds zeros to single characters', () => {
    expect(padZero('f')).toBe('0f');
  });
    test('adds nothing to double characters', () => {
    expect(padZero('f6')).toBe('f6');
  });
      test('removes first character from triples', () => {
    expect(padZero('e6f')).toBe('6f');
  });
});

describe('filterAlphal', () => {
  test('50% opacity should append 80', () => {
    const color = `#00000080`;
    const result = filterAlpha('#000000', 50);
    expect(result).toBe(color);
  });
});