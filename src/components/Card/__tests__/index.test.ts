import { describe, it, expect } from 'vitest';
import Card from '../index';

describe('Card Component Exports', () => {
  it('exports Card component as default', () => {
    expect(Card).toBeDefined();
    expect(Card).toHaveProperty('__name');
  });

  it('Card component has the correct structure', () => {
    expect(Card).toHaveProperty('__name');
    expect(Card.__name).toBe('Card');
    expect(Card).toHaveProperty('setup');
  });
});
