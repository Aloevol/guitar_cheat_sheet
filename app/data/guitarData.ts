/**
 * COMPATIBILITY SHIM — re-exports everything from the modular data layer.
 * All existing imports continue to work. Migrate to ./data/index over time.
 */
export {
  DATA,
  PAL,
  CATEGORIES,
  QUICK_SEARCHES,
  FEATURED_IDS,
  KEYS_DATA,
  ALL_ROOTS,
  CATEGORY_CONFIG,
} from './index'
