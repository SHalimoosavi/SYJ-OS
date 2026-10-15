import { describe, expect, it } from 'vitest';
import { calculate } from '../src/apps/Calculator';

describe('calculator', () => { it('evaluates arithmetic', () => { expect(calculate('2+3×4')).toBe(14); expect(calculate('(10-2)/4')).toBe(2); expect(calculate('50%')).toBe(.5); }); it('rejects incomplete input', () => { expect(() => calculate('4+')).toThrow(); }); });
