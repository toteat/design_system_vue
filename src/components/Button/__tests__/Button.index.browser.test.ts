import { describe, it, expect } from 'vitest';
import { Button } from '../index';
import type { ButtonProps } from '@/types';

describe('Button index', () => {
  it('exports Button component', () => {
    expect(Button).toBeDefined();
  });

  it('exports ButtonProps type', () => {
    const props: ButtonProps = {
      variant: 'primary',
      disabled: false,
      isFull: false,
      size: 'medium',
      type: 'button',
      loading: false,
      text: 'Button',
      selected: false,
      iconPosition: 'right',
      iconName: 'home-outline',
      onlyIcon: false,
    };
    expect(props).toBeDefined();
  });
});
