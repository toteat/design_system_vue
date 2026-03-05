import { describe, it, expect } from 'vitest';
import Header from '../index';

describe('Header Component Exports', () => {
  it('exports Header component as default', () => {
    expect(Header).toBeDefined();
    expect(Header).toHaveProperty('__name');
  });

  it('Header component has the correct structure', () => {
    expect(Header).toHaveProperty('__name');
    expect(Header.__name).toBe('Header');
    expect(Header).toHaveProperty('setup');
  });
});
