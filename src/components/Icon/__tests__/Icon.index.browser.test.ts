import { describe, it, expect } from 'vitest';
import { Icon } from '../index';
import type { IconNames } from '../icons';

describe('Icon index', () => {
  it('exports Icon component', () => {
    expect(Icon).toBeDefined();
  });

  it('exports IconNames type', () => {
    const iconName: IconNames = 'home-outline';
    expect(iconName).toBeDefined();
  });
});
