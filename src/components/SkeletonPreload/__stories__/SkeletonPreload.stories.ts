import type { Meta, StoryObj } from '@storybook/vue3';
import SkeletonPreload from '../SkeletonPreload.vue';

const meta = {
  title: 'Components/SkeletonPreload',
  component: SkeletonPreload,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
      description: 'Width of the skeleton in pixels',
    },
    height: {
      control: 'number',
      description: 'Height of the skeleton in pixels',
    },
    borderRadius: {
      control: 'number',
      description:
        'Border radius of the skeleton in pixels, if the component is round then the width value will be used for the height',
    },
    isRounded: {
      control: 'boolean',
      description: 'Whether the skeleton should be circular',
    },
  },
} satisfies Meta<typeof SkeletonPreload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base sizes
const sizes = {
  tiny: { width: 50, height: 50 },
  small: { width: 100, height: 100 },
  medium: { width: 200, height: 200 },
  large: { width: 400, height: 400 },
};

// Border radius options
const borderRadii = {
  none: 0,
  small: 8,
  medium: 16,
  large: 24,
};

// Generate stories for each size
const stories: Record<string, Story> = {};

Object.entries(sizes).forEach(([sizeName, dimensions]) => {
  // Circular version
  stories[`${sizeName}Circle`] = {
    args: {
      ...dimensions,
      borderRadius: 0,
      isRounded: true,
    },
  };

  // Square version
  stories[`${sizeName}Square`] = {
    args: {
      ...dimensions,
      borderRadius: 8,
      isRounded: false,
    },
  };

  // Rounded versions with different border radii
  Object.entries(borderRadii).forEach(([radiusName, radius]) => {
    const capitalizedRadius =
      radiusName.charAt(0).toUpperCase() + radiusName.slice(1);
    stories[`${sizeName}Rounded${capitalizedRadius}`] = {
      args: {
        ...dimensions,
        borderRadius: radius,
        isRounded: false,
      },
    };
  });
});

// Export all generated stories
export const {
  tinyCircle,
  tinySquare,
  tinyRoundedNone,
  tinyRoundedSmall,
  tinyRoundedMedium,
  tinyRoundedLarge,
  smallCircle,
  smallSquare,
  smallRoundedNone,
  smallRoundedSmall,
  smallRoundedMedium,
  smallRoundedLarge,
  mediumCircle,
  mediumSquare,
  mediumRoundedNone,
  mediumRoundedSmall,
  mediumRoundedMedium,
  mediumRoundedLarge,
  largeCircle,
  largeSquare,
  largeRoundedNone,
  largeRoundedSmall,
  largeRoundedMedium,
  largeRoundedLarge,
} = stories;

// Special cases
export const Rectangle: Story = {
  args: {
    width: 300,
    height: 100,
    borderRadius: 8,
    isRounded: false,
  },
};

export const Pill: Story = {
  args: {
    width: 200,
    height: 40,
    borderRadius: 20,
    isRounded: false,
  },
};

// Additional special cases
export const Avatar: Story = {
  args: {
    width: 64,
    height: 64,
    isRounded: true,
  },
};

export const Card: Story = {
  args: {
    width: 300,
    height: 200,
    borderRadius: 8,
    isRounded: false,
  },
};

export const TextLine: Story = {
  args: {
    width: 200,
    height: 16,
    borderRadius: 4,
    isRounded: false,
  },
};

export const TextBlock: Story = {
  args: {
    width: 300,
    height: 100,
    borderRadius: 4,
    isRounded: false,
  },
};

export const Thumbnail: Story = {
  args: {
    width: 120,
    height: 80,
    borderRadius: 4,
    isRounded: false,
  },
};

export const Button: Story = {
  args: {
    width: 120,
    height: 36,
    borderRadius: 4,
    isRounded: false,
  },
};

export const Icon: Story = {
  args: {
    width: 24,
    height: 24,
    isRounded: false,
  },
};
