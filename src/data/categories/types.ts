export type CategoryId = 'world' | 'role' | 'women' | 'dynamic' | 'taboo';

export interface CategoryConfig {
  id: CategoryId;
  index: number;
  label: string;
  subtitle: string;
  shortName: string;
  description: string;
  icon: string;
  items: string[];
}

export type ScenarioState = Record<CategoryId, string>;
export type LockState = Record<CategoryId, boolean>;

export interface SavedScenario {
  id: string;
  createdAt: number;
  title?: string;
  tags?: string[];
  notes?: string;
  data: ScenarioState;
}

export interface CategoryDataExport {
  version: number;
  exportedAt: string;
  categories: Record<CategoryId, string[]>;
}
