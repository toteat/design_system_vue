// AUTO-GENERATED — run `npm run sync:tokens` to update from source.

export type TokenCategory = 'colors' | 'typography' | 'radius' | 'spacing';

export type Token = {
  name: string;
  value: string;
  description?: string;
};

export const TOKENS: Record<TokenCategory, Token[]> = {
  colors: [
    {
      name: '--color-primary',
      value: '#ff4235',
      description: 'Brand primary red',
    },
    { name: '--color-primary-light', value: '#ffa099' },
    {
      name: '--color-secondary',
      value: '#1b1b1b',
      description: 'Brand secondary dark',
    },
    { name: '--color-secondary-light', value: '#b3b3b3' },
    { name: '--color-tertiary', value: '#e6d9ca' },
    { name: '--color-tertiary-light', value: '#f7f3ee' },
    { name: '--color-white', value: '#ffffff' },
    { name: '--color-black', value: '#000000' },
    { name: '--color-neutral', value: '#ffffff' },
    { name: '--color-neutral-50', value: '#f7f7f7' },
    { name: '--color-neutral-100', value: '#f2f2f2' },
    { name: '--color-neutral-200', value: '#dddddd' },
    { name: '--color-neutral-300', value: '#cfcfcf' },
    { name: '--color-neutral-400', value: '#a1a1a1' },
    { name: '--color-neutral-500', value: '#464646' },
    { name: '--color-gray-100', value: '#f2f2f2' },
    { name: '--color-gray-200', value: '#dddddd' },
    { name: '--color-gray-300', value: '#cfcfcf' },
    { name: '--color-gray-400', value: '#a1a1a1' },
    { name: '--color-gray-500', value: '#464646' },
    { name: '--color-blue', value: '#275ffd', description: 'Info blue' },
    { name: '--color-blue-light', value: '#cef3f7' },
    { name: '--color-dark-blue', value: '#123599' },
    { name: '--color-green', value: '#46D281', description: 'Success green' },
    { name: '--color-green-light', value: '#cdf3db' },
    { name: '--color-green-dark', value: '#2C7F4F' },
    { name: '--color-yellow', value: '#FFAC2C', description: 'Warning yellow' },
    { name: '--color-yellow-dark', value: '#C48930' },
    { name: '--color-yellow-light', value: '#FFE2B4' },
    { name: '--color-red', value: '#e12845', description: 'Error red' },
    { name: '--color-red-light', value: '#fbd7dd' },
    { name: '--color-red-dark', value: '#6B0414' },
  ],
  typography: [
    { name: '--text-xs', value: '12px' },
    {
      name: '--text-sm',
      value: '14px',
      description: 'Minimum for interactive elements',
    },
    { name: '--text-base', value: '16px', description: 'Default body text' },
    { name: '--text-lg', value: '20px' },
    { name: '--text-xl', value: '24px' },
    { name: '--text-2xl', value: '32px' },
    { name: '--text-3xl', value: '40px' },
    { name: '--text-4xl', value: '48px' },
    { name: '--text-5xl', value: '56px' },
    { name: '--text-6xl', value: '64px' },
    { name: '--text-xs--line-height', value: '16px' },
    { name: '--text-sm--line-height', value: '20px' },
    { name: '--text-base--line-height', value: '24px' },
    { name: '--text-lg--line-height', value: '28px' },
    { name: '--text-xl--line-height', value: '32px' },
    { name: '--text-2xl--line-height', value: '40px' },
    { name: '--text-3xl--line-height', value: '48px' },
    { name: '--text-4xl--line-height', value: '56px' },
    { name: '--text-5xl--line-height', value: '64px' },
    { name: '--text-6xl--line-height', value: '72px' },
  ],
  radius: [
    { name: '--radius-none', value: '0' },
    {
      name: '--radius-sm',
      value: '0.25rem',
      description: '4px - Small radius',
    },
    {
      name: '--radius-base',
      value: '0.5rem',
      description: '8px - Standard radius',
    },
    {
      name: '--radius-lg',
      value: '0.75rem',
      description: '12px - Large radius',
    },
    { name: '--radius-xl', value: '1rem', description: '16px - Extra large' },
    { name: '--radius-pill', value: '9999px', description: 'Pill shape' },
    { name: '--radius-circle', value: '50%', description: 'Perfect circle' },
  ],
  spacing: [
    { name: '--spacing-xs', value: '0.25rem', description: '4px' },
    { name: '--spacing-sm', value: '0.5rem', description: '8px' },
    { name: '--spacing-md', value: '0.75rem', description: '12px' },
    { name: '--spacing-lg', value: '1rem', description: '16px' },
    { name: '--spacing-xl', value: '1.5rem', description: '24px' },
    { name: '--spacing-2xl', value: '2rem', description: '32px' },
    { name: '--spacing-3xl', value: '3rem', description: '48px' },
  ],
};
