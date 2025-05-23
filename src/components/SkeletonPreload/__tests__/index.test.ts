import { describe, it, expect } from 'vitest';
import SkeletonPreload from '../SkeletonPreload.vue';

describe('SkeletonPreload index', () => {
  it('should export the SkeletonPreload component as default', () => {
    expect(SkeletonPreload).toBeDefined();
  });
});
