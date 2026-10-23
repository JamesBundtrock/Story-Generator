import React, { useState } from 'react';
import { 
  Dices, 
  Lock, 
  Unlock, 
  BookmarkPlus, 
  Copy, 
  Check, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { LockState, ScenarioState } from '../data/categories/types';
import { formatScenarioClipboard } from '../data/categories';

interface RollControlsProps {
  locks: LockState;
  scenario: ScenarioState;
  onRollUnlocked: () => void;
  onLockAll: () => void;
  onUnlockAll: () => void;
  onSaveScenario: () => void;
  onOpenPresets: () => void;
  onOpenLibrary: () => void;
}

export const RollControls: React.FC<RollControlsProps> = ({
  locks,
  scenario,
  onRollUnlocked,
  onLockAll,
  onUnlockAll,
  onSaveScenario,
  onOpenPresets,
  onOpenLibrary,
}) => {
  const [copied, setCopied] = useState(false);

  const lockedCount = Object.values(locks).filter(Boolean).length;
  const unlockedCount = 5 - lockedCount;
  const allLocked = unlockedCount === 0;

  const handleCopyFull = () => {
    const formatted = formatScenarioClipboard(scenario);
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-5">
      {/* Primary Action Button */}
      <div className="flex flex-col items-center gap-2 w-full max-w-md">
        <button
          onClick={onRollUnlocked}
          disabled={allLocked}
          className={`w-full py-4 px-8 text-sm md:text-base font-semibold uppercase tracking-[0.2em] rounded-md transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
            allLocked
              ? 'bg-zinc-900/60 border border-zinc-800 text-zinc-600 cursor-not-allowed'
              : 'bg-red-950/40 hover:bg-red-900/80 text-red-200 hover:text-white border border-red-700/80 hover:border-red-500 shadow-[0_0_20px_rgba(153,27,27,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-[0.98]'
          }`}
        >
          <Dices className={`w-5 h-5 ${!allLocked ? 'text-red-400 animate-pulse' : ''}`} />
          <span>
            {allLocked
              ? 'All 5 Locked (Unlock To Roll)'
              : unlockedCount === 5
              ? 'Roll The Dice (All 5)'
              : `Roll ${unlockedCount} Unlocked (${lockedCount} Locked)`}
          </span>
        </button>

        <div className="text-[11px] text-zinc-500 tracking-wider flex items-center gap-2">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded text-[10px]">Space</kbd> or <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded text-[10px]">Enter</kbd> to roll</span>
        </div>
      </div>

      {/* Auxiliary Control Bar */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2.5 pt-2">
        {/* Quick lock / unlock all */}
        {allLocked ? (
          <button
            onClick={onUnlockAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock All (5)</span>
          </button>
        ) : (
          <button
            onClick={onLockAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock All ({unlockedCount} remaining)</span>
          </button>
        )}

        {/* Copy full pitch */}
        <button
          onClick={handleCopyFull}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied Full Pitch</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Scenario</span>
            </>
          )}
        </button>

        {/* Save to favorites */}
        <button
          onClick={onSaveScenario}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-red-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
        >
          <BookmarkPlus className="w-3.5 h-3.5 text-red-400" />
          <span>Save Loadout</span>
        </button>

        {/* Thematic Presets */}
        <button
          onClick={onOpenPresets}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-amber-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Curated Presets</span>
        </button>

        {/* Category Library & Files Manager */}
        <button
          onClick={onOpenLibrary}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 hover:text-white bg-red-950/30 hover:bg-red-950/50 border border-red-900/60 rounded transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
          <span>Manage Category Files</span>
        </button>
      </div>
    </div>
  );
};
