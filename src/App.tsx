/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  CATEGORIES, 
  CATEGORY_IDS, 
  CategoryId, 
  LockState, 
  ScenarioState, 
  SavedScenario,
  getInitialPools, 
  persistPools, 
  resetPoolsToDefault,
  rollScenario, 
  rollSingleCategory,
  DEFAULT_ITEM_POOLS
} from './data/categories';
import { CategoryCard } from './components/CategoryCard';
import { RollControls } from './components/RollControls';
import { CategoryLibraryModal } from './components/CategoryLibraryModal';
import { SavedScenariosDrawer } from './components/SavedScenariosDrawer';
import { PresetsModal } from './components/PresetsModal';
import { 
  Dices, 
  Bookmark, 
  FolderGit2, 
  SlidersHorizontal, 
  Sparkles,
  HelpCircle,
  FileCode2
} from 'lucide-react';

const INITIAL_LOCKS: LockState = {
  world: false,
  role: false,
  women: false,
  dynamic: false,
  taboo: false,
};

const STORAGE_SAVED_KEY = 'scenario_generator_saved_list_v1';

export default function App() {
  const [pools, setPools] = useState<Record<CategoryId, string[]>>(() => getInitialPools());
  const [locks, setLocks] = useState<LockState>(INITIAL_LOCKS);
  const [scenario, setScenario] = useState<ScenarioState>(() => {
    // Initial random generation on load
    const initialPools = getInitialPools();
    return rollScenario(
      { world: '', role: '', women: '', dynamic: '', taboo: '' },
      INITIAL_LOCKS,
      initialPools
    );
  });

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Modals & Panels
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Sync saved list to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedScenarios));
    } catch (e) {
      console.error(e);
    }
  }, [savedScenarios]);

  // Roll unlocked handler
  const handleRollUnlocked = useCallback(() => {
    setScenario((prev) => rollScenario(prev, locks, pools));
  }, [locks, pools]);

  // Toggle lock on single category
  const handleToggleLock = (id: CategoryId) => {
    setLocks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Roll single category item
  const handleRerollSingle = (id: CategoryId) => {
    if (locks[id]) return;
    const rolled = rollSingleCategory(id, pools, scenario[id]);
    setScenario((prev) => ({
      ...prev,
      [id]: rolled,
    }));
  };

  // Manually pick an item
  const handleSelectItem = (id: CategoryId, item: string) => {
    setScenario((prev) => ({
      ...prev,
      [id]: item,
    }));
  };

  // Lock all / unlock all
  const handleLockAll = () => {
    setLocks({
      world: true,
      role: true,
      women: true,
      dynamic: true,
      taboo: true,
    });
  };

  const handleUnlockAll = () => {
    setLocks(INITIAL_LOCKS);
  };

  // Save current scenario to bookmarks
  const handleSaveCurrentScenario = () => {
    const newEntry: SavedScenario = {
      id: `scen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
      data: { ...scenario },
    };
    setSavedScenarios((prev) => [newEntry, ...prev]);
    setIsSavedDrawerOpen(true);
  };

  // Load a saved scenario
  const handleLoadScenario = (loaded: ScenarioState) => {
    setScenario(loaded);
  };

  // Delete saved scenario
  const handleDeleteSaved = (id: string) => {
    setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  // Clear all saved scenarios
  const handleClearAllSaved = () => {
    setSavedScenarios([]);
  };

  // Update item pool for category
  const handleUpdatePool = (id: CategoryId, newItems: string[]) => {
    const nextPools = {
      ...pools,
      [id]: newItems,
    };
    setPools(nextPools);
    persistPools(nextPools);
  };

  // Reset single category pool to defaults
  const handleResetCategoryPool = (id: CategoryId) => {
    const nextPools = {
      ...pools,
      [id]: [...DEFAULT_ITEM_POOLS[id]],
    };
    setPools(nextPools);
    persistPools(nextPools);
  };

  // Reset all category pools to defaults
  const handleResetAllPools = () => {
    const defaulted = resetPoolsToDefault();
    setPools(defaulted);
  };

  // Import custom pools
  const handleImportPools = (imported: Record<CategoryId, string[]>) => {
    setPools(imported);
    persistPools(imported);
  };

  // Global keyboard shortcuts (Space or Enter to roll unlocked when not in an input/textarea)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        (activeEl as HTMLElement)?.isContentEditable;

      if (isInput) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleRollUnlocked();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRollUnlocked]);

  const totalPoolItemsCount = Object.values(pools).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12 text-zinc-100 selection:bg-red-950 selection:text-red-200">
      {/* Top Utility Bar */}
      <header className="w-full max-w-3xl flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
            Modular Scenario Generator
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Presets */}
          <button
            onClick={() => setIsPresetsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded text-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Presets</span>
          </button>

          {/* Saved Scenarios */}
          <button
            onClick={() => setIsSavedDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded text-xs transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Saved</span>
            <span className="text-[10px] bg-red-950/70 border border-red-800/60 text-red-200 px-1.5 py-0.2 rounded font-mono">
              {savedScenarios.length}
            </span>
          </button>

          {/* Manage Category Files */}
          <button
            onClick={() => setIsLibraryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/50 border border-red-800/80 text-red-200 rounded text-xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
            <span>Files & Options</span>
          </button>

          {/* Help & Architecture Guide */}
          <button
            onClick={() => setIsHelpOpen(true)}
            title="How modular category files work"
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Title Section */}
      <div className="text-center mb-8 max-w-xl">
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.25em] text-red-700 uppercase font-cinzel mb-3 drop-shadow-[0_2px_12px_rgba(185,28,28,0.25)]">
          The Generator
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm font-light tracking-wide leading-relaxed">
          Lock the butterfly to the board and shuffle the world around it. Pin your favorite elements in place, roll the rest, or customize the 5 category files.
        </p>
      </div>

      {/* 5 Scenario Category Cards */}
      <main className="w-full max-w-3xl flex flex-col gap-4">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            value={scenario[category.id]}
            isLocked={locks[category.id]}
            totalOptionsCount={(pools[category.id] || []).length}
            allPoolItems={pools[category.id] || []}
            onToggleLock={handleToggleLock}
            onRerollSingle={handleRerollSingle}
            onSelectItem={handleSelectItem}
          />
        ))}

        {/* Global Controls */}
        <RollControls
          locks={locks}
          scenario={scenario}
          onRollUnlocked={handleRollUnlocked}
          onLockAll={handleLockAll}
          onUnlockAll={handleUnlockAll}
          onSaveScenario={handleSaveCurrentScenario}
          onOpenPresets={() => setIsPresetsOpen(true)}
          onOpenLibrary={() => setIsLibraryOpen(true)}
        />
      </main>

      {/* Architecture & File Structure Banner */}
      <footer className="mt-14 pt-6 border-t border-zinc-800/60 w-full max-w-3xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500 mb-2">
          <span className="flex items-center gap-1.5">
            <FileCode2 className="w-3.5 h-3.5 text-red-500/70" />
            <span>5 Modular Category Files</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>{totalPoolItemsCount} Curated Scenarios</span>
          <span aria-hidden="true">·</span>
          <span>Local Storage Persistence</span>
        </div>
        <p className="text-[11px] text-zinc-600">
          Source files located in <code className="text-zinc-400 font-mono">/src/data/categories/</code> (world.ts, role.ts, women.ts, dynamic.ts, taboo.ts).
        </p>
      </footer>

      {/* Modals & Drawers */}
      <CategoryLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        pools={pools}
        onUpdatePool={handleUpdatePool}
        onResetCategory={handleResetCategoryPool}
        onResetAll={handleResetAllPools}
        onImportPools={handleImportPools}
      />

      <SavedScenariosDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedList={savedScenarios}
        onLoadScenario={handleLoadScenario}
        onDeleteScenario={handleDeleteSaved}
        onClearAll={handleClearAllSaved}
      />

      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleLoadScenario}
      />

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold uppercase tracking-wider text-zinc-100 font-cinzel">
                How It Works & File Organization
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-red-400">1. Locking Mechanism:</strong> Click the "LOCK" button on any category card. When locked, it turns luminous red. Subsequent rolls will preserve your locked choice while randomizing the remaining categories.
              </p>
              <p>
                <strong className="text-red-400">2. Modular Category Files:</strong> Each category is split into its own clean TypeScript file in the codebase:
              </p>
              <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-zinc-400 pl-1">
                <li><code className="text-zinc-200">/src/data/categories/world.ts</code> (1. The World)</li>
                <li><code className="text-zinc-200">/src/data/categories/role.ts</code> (2. Your Role)</li>
                <li><code className="text-zinc-200">/src/data/categories/women.ts</code> (3. The Women)</li>
                <li><code className="text-zinc-200">/src/data/categories/dynamic.ts</code> (4. The Dynamic)</li>
                <li><code className="text-zinc-200">/src/data/categories/taboo.ts</code> (5. The Taboo)</li>
              </ul>
              <p>
                <strong className="text-red-400">3. In-App Manager & Code Exporter:</strong> Click <strong className="text-zinc-200">"Files & Options"</strong> to add, edit, or bulk-paste options directly. You can even click <strong className="text-zinc-200">"View File Code"</strong> to instantly copy the exact code block for any `.ts` file.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs cursor-pointer font-medium"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
