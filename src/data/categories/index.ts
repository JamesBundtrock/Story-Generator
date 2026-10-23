import { CategoryConfig, CategoryId, LockState, ScenarioState, CategoryDataExport } from './types';
import { worldCategory, worldItems } from './world';
import { roleCategory, roleItems } from './role';
import { womenCategory, womenItems } from './women';
import { dynamicCategory, dynamicItems } from './dynamic';
import { tabooCategory, tabooItems } from './taboo';

export * from './types';
export { worldCategory, worldItems } from './world';
export { roleCategory, roleItems } from './role';
export { womenCategory, womenItems } from './women';
export { dynamicCategory, dynamicItems } from './dynamic';
export { tabooCategory, tabooItems } from './taboo';

export const CATEGORIES: CategoryConfig[] = [
  worldCategory,
  roleCategory,
  womenCategory,
  dynamicCategory,
  tabooCategory,
];

export const CATEGORY_IDS: CategoryId[] = ['world', 'role', 'women', 'dynamic', 'taboo'];

export const DEFAULT_ITEM_POOLS: Record<CategoryId, string[]> = {
  world: worldItems,
  role: roleItems,
  women: womenItems,
  dynamic: dynamicItems,
  taboo: tabooItems,
};

const STORAGE_KEY_CATEGORIES = 'scenario_generator_custom_pools_v1';
const STORAGE_KEY_SAVED = 'scenario_generator_saved_v1';

export function getInitialPools(): Record<CategoryId, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      const pools: Record<CategoryId, string[]> = { ...DEFAULT_ITEM_POOLS };
      for (const id of CATEGORY_IDS) {
        if (Array.isArray(parsed[id]) && parsed[id].length > 0) {
          pools[id] = parsed[id];
        }
      }
      return pools;
    }
  } catch (err) {
    console.error('Failed to parse stored category pools:', err);
  }
  return { ...DEFAULT_ITEM_POOLS };
}

export function persistPools(pools: Record<CategoryId, string[]>): void {
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(pools));
  } catch (err) {
    console.error('Failed to persist category pools:', err);
  }
}

export function resetPoolsToDefault(): Record<CategoryId, string[]> {
  try {
    localStorage.removeItem(STORAGE_KEY_CATEGORIES);
  } catch (e) {
    console.error(e);
  }
  return {
    world: [...worldItems],
    role: [...roleItems],
    women: [...womenItems],
    dynamic: [...dynamicItems],
    taboo: [...tabooItems],
  };
}

export function getRandomItem(array: string[]): string {
  if (!array || array.length === 0) return 'No options available in this category.';
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
}

export function rollScenario(
  current: ScenarioState,
  locks: LockState,
  pools: Record<CategoryId, string[]>
): ScenarioState {
  const next: ScenarioState = { ...current };
  for (const id of CATEGORY_IDS) {
    if (!locks[id]) {
      const pool = pools[id] && pools[id].length > 0 ? pools[id] : DEFAULT_ITEM_POOLS[id];
      // Try to avoid repeating the exact same item if multiple exist
      if (pool.length > 1) {
        let rolled = getRandomItem(pool);
        let attempts = 0;
        while (rolled === current[id] && attempts < 5) {
          rolled = getRandomItem(pool);
          attempts++;
        }
        next[id] = rolled;
      } else {
        next[id] = getRandomItem(pool);
      }
    }
  }
  return next;
}

export function rollSingleCategory(
  catId: CategoryId,
  pools: Record<CategoryId, string[]>,
  currentVal?: string
): string {
  const pool = pools[catId] && pools[catId].length > 0 ? pools[catId] : DEFAULT_ITEM_POOLS[catId];
  if (pool.length > 1 && currentVal) {
    let rolled = getRandomItem(pool);
    let attempts = 0;
    while (rolled === currentVal && attempts < 5) {
      rolled = getRandomItem(pool);
      attempts++;
    }
    return rolled;
  }
  return getRandomItem(pool);
}

export function formatScenarioClipboard(scenario: ScenarioState): string {
  return [
    `=== THE SCENARIO ===`,
    `[1. THE WORLD (SETTING)]`,
    scenario.world || 'None',
    ``,
    `[2. YOUR ROLE (THE PROTAGONIST)]`,
    scenario.role || 'None',
    ``,
    `[3. MY ROLE(S) (THE WOMEN)]`,
    scenario.women || 'None',
    ``,
    `[4. THE DYNAMIC / THE HOOK]`,
    scenario.dynamic || 'None',
    ``,
    `[5. THE TWIST / THE TABOO]`,
    scenario.taboo || 'None',
    `====================`
  ].join('\n');
}

export function exportAllPoolsAsJSON(pools: Record<CategoryId, string[]>): string {
  const payload: CategoryDataExport = {
    version: 1,
    exportedAt: new Date().toISOString(),
    categories: pools,
  };
  return JSON.stringify(payload, null, 2);
}
