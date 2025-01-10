import { SliceRegistry } from './types';
import { auditConfig } from './audit/navigation';

export const sliceRegistry: SliceRegistry = {
  audit: auditConfig
};

// Helper function to get all menu items
export const getMenuItems = () => {
  return Object.values(sliceRegistry).map(slice => slice.navigation);
};
